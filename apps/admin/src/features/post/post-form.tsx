import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  Box,
  Button,
  Card,
  Code,
  Divider,
  FileInput,
  Grid,
  Group,
  Image,
  Select,
  Stack,
  Switch,
  TagsInput,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { notifications } from '@mantine/notifications'
import Editor, { type Monaco } from '@monaco-editor/react'
import {
  IconAlertCircle,
  IconCalendar,
  IconCode,
  IconExternalLink,
  IconHighlight,
  IconInfoCircle,
  IconPhoto,
  IconPlus,
  IconUpload,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CategoryModal } from '@/features/category'
import { adminApi, uploadFile } from '@/shared/api'
import { BLOG_URL } from '@/shared/config'
import { monokaiWinterNight } from '@/shared/config/editor-theme'
import { type PostFormValues, postSchema } from '@/shared/schemas'

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>
  onSubmit: (values: PostFormValues) => void
  isPending: boolean
  mode: 'create' | 'edit'
  slug?: string
}

export function PostForm({ defaultValues, onSubmit, isPending, mode, slug }: PostFormProps) {
  const navigate = useNavigate()
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [previewToken, setPreviewToken] = useState<string | null>(null)

  useEffect(() => {
    import('@/entities/auth').then(({ getPreviewToken }) => {
      getPreviewToken().then(setPreviewToken)
    })
  }, [])

  const [categoryModalOpened, setCategoryModalOpened] = useState(false)

  const { data: categoriesData } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => adminApi.get('api/blog/categories').json<{ category: string; count: number }[]>(),
  })

  const { data: tagsData } = useQuery({
    queryKey: ['tags-list'],
    queryFn: () => adminApi.get('api/blog/tags').json<{ tags: { name: string; count: number }[]; total: number }>(),
  })

  const categoryOptions = categoriesData?.map(c => c.category) ?? []
  const tagOptions = tagsData?.tags.map(t => t.name) ?? []

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      category: '',
      tags: [],
      thumbnailUrl: '',
      published: false,
      publishedAt: '',
      ...defaultValues,
    },
  })

  const thumbnailUrl = watch('thumbnailUrl')
  const published = watch('published')

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      const result = await uploadFile<{ url: string }>('api/blog/images', formData)
      return result.url
    } catch {
      notifications.show({ title: '업로드 실패', message: '10MB 이하 이미지만 가능합니다.', color: 'red' })
      return null
    }
  }

  const openPreview = () => {
    if (!slug || !previewToken) return
    window.open(`${BLOG_URL}/preview/${slug}?token=${previewToken}`, '_blank')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="xl">
            <TextInput
              label="제목"
              size="md"
              placeholder="포스트 제목을 입력하세요"
              error={errors.title?.message}
              styles={{ input: { fontSize: 18, fontWeight: 600 } }}
              {...register('title')}
            />

            <TextInput
              label="설명"
              size="md"
              placeholder="미입력 시 본문에서 자동 추출됩니다"
              error={errors.description?.message}
              {...register('description')}
            />

            <Box>
              {errors.content && (
                <Text size="xs" c="red" mb={4}>
                  {errors.content.message}
                </Text>
              )}
              <Box style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', border: '1px solid var(--mantine-color-default-border)' }}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      height="calc(100vh - 400px)"
                      defaultLanguage="markdown"
                      value={field.value}
                      onChange={value => field.onChange(value ?? '')}
                      beforeMount={(monaco: Monaco) => {
                        monaco.editor.defineTheme('monokai-winter-night', monokaiWinterNight)
                      }}
                      theme="monokai-winter-night"
                      onMount={editor => {
                        const dom = editor.getDomNode()
                        if (!dom) return

                        const insertImage = async (file: File) => {
                          const url = await handleImageUpload(file)
                          if (!url) return
                          const position = editor.getPosition()
                          if (!position) return
                          const insertText = `\n<MdxImage src="${url}" alt="" caption="" />\n`
                          editor.executeEdits('', [
                            {
                              range: { startLineNumber: position.lineNumber, startColumn: position.column, endLineNumber: position.lineNumber, endColumn: position.column },
                              text: insertText,
                            },
                          ])
                          const newLine = position.lineNumber + 1
                          editor.setPosition({ lineNumber: newLine, column: 1 })
                          editor.revealLineInCenter(newLine)
                          editor.focus()
                        }

                        dom.addEventListener('paste', async (e: Event) => {
                          const ce = e as ClipboardEvent
                          const file = ce.clipboardData?.files[0]
                          if (!file?.type.startsWith('image/')) return
                          ce.preventDefault()
                          ce.stopPropagation()
                          insertImage(file)
                        })
                        dom.addEventListener('dragover', (e: Event) => { e.preventDefault(); e.stopPropagation() }, true)
                        dom.addEventListener('drop', async (e: Event) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const de = e as DragEvent
                          const file = de.dataTransfer?.files[0]
                          if (!file?.type.startsWith('image/')) return
                          insertImage(file)
                        }, true)
                      }}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        renderLineHighlight: 'all',
                        bracketPairColorization: { enabled: true },
                        cursorBlinking: 'smooth',
                        smoothScrolling: true,
                        roundedSelection: true,
                        cursorSmoothCaretAnimation: 'on',
                        dropIntoEditor: { enabled: false },
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="lg">
                <Text size="sm" fw={600}>
                  설정
                </Text>
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      label={field.value ? '발행' : '임시저장'}
                      checked={field.value}
                      onChange={field.onChange}
                      color="teal"
                    />
                  )}
                />
              </Group>

              <Stack gap="lg">
                <div>
                  <Group justify="space-between" mb={8}>
                    <Text size="sm" fw={500}>카테고리</Text>
                    <Button variant="subtle" size="compact-xs" leftSection={<IconPlus size={12} />} onClick={() => setCategoryModalOpened(true)}>
                      관리
                    </Button>
                  </Group>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        placeholder="카테고리 선택"
                        data={categoryOptions}
                        error={errors.category?.message}
                        value={field.value || null}
                        onChange={(v: string | null) => field.onChange(v ?? '')}
                        searchable
                        clearable
                      />
                    )}
                  />
                </div>

                <CategoryModal
                  opened={categoryModalOpened}
                  onClose={() => setCategoryModalOpened(false)}
                  onSelect={(v: string) => setValue('category', v)}
                />

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      label="태그"
                      placeholder="Enter로 추가"
                      data={tagOptions}
                      error={errors.tags?.message}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  name="publishedAt"
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      label="발행일"
                      placeholder="미입력 시 발행 시점 자동"
                      leftSection={<IconCalendar size={16} />}
                      clearable
                      highlightToday
                      firstDayOfWeek={0}
                      maxDate={new Date()}
                      value={field.value || null}
                      onChange={date => field.onChange(date ?? '')}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Card padding="lg" radius="md" withBorder>
              <Text size="sm" fw={600} mb="md">
                썸네일
              </Text>
              {thumbnailUrl ? (
                <Stack gap="xs">
                  <Image src={thumbnailUrl} alt="썸네일" radius="md" h={180} fit="cover" />
                  <Button variant="subtle" size="xs" color="red" onClick={() => setValue('thumbnailUrl', '')}>
                    제거
                  </Button>
                </Stack>
              ) : (
                <Stack gap="xs">
                  <FileInput
                    placeholder={thumbnailUploading ? '업로드 중...' : '이미지를 선택하면 자동 업로드됩니다'}
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    leftSection={thumbnailUploading ? <IconUpload size={16} /> : <IconPhoto size={16} />}
                    disabled={thumbnailUploading}
                    onChange={async (file) => {
                      if (!file) return
                      setThumbnailUploading(true)
                      const url = await handleImageUpload(file)
                      if (url) {
                        setValue('thumbnailUrl', url)
                        notifications.show({ title: '썸네일 업로드', message: '업로드 완료', color: 'teal' })
                      }
                      setThumbnailUploading(false)
                    }}
                  />
                  <Text size="xs" c="dimmed">
                    1200x630 권장 (OG 이미지), 10MB 제한
                  </Text>
                </Stack>
              )}
            </Card>

            <Card padding="lg" radius="md" withBorder>
              <Text size="sm" fw={600} mb="md">
                MDX 컴포넌트
              </Text>
              <Accordion variant="separated" radius="md">
                <Accordion.Item value="callout">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="blue" size="sm"><IconInfoCircle size={14} /></ThemeIcon>}>
                    <Text size="sm">Callout</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>type: tip | info | warning | error | success | default</Text>
                    <Stack gap={6}>
                      <Code block>{`<Callout type="tip">팁 내용</Callout>`}</Code>
                      <Code block>{`<Callout type="info">정보</Callout>`}</Code>
                      <Code block>{`<Callout type="warning">경고</Callout>`}</Code>
                      <Code block>{`<Callout type="error">에러</Callout>`}</Code>
                      <Code block>{`<Callout type="success">성공</Callout>`}</Code>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="highlight">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="pink" size="sm"><IconHighlight size={14} /></ThemeIcon>}>
                    <Text size="sm">Highlight</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>color: fuchsia (기본) | blue | green | yellow | red</Text>
                    <Stack gap={6}>
                      <Code block>{`<Highlight>기본 강조 (fuchsia)</Highlight>`}</Code>
                      <Code block>{`<Highlight color="blue">파란색</Highlight>`}</Code>
                      <Code block>{`<Highlight color="green">초록색</Highlight>`}</Code>
                      <Code block>{`<Highlight color="yellow">노란색</Highlight>`}</Code>
                      <Code block>{`<Highlight color="red">빨간색</Highlight>`}</Code>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="image">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="green" size="sm"><IconPhoto size={14} /></ThemeIcon>}>
                    <Text size="sm">MdxImage</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>src (필수), alt, caption, width, height, priority</Text>
                    <Stack gap={6}>
                      <Code block>{`<MdxImage src="https://..." alt="설명" />`}</Code>
                      <Code block>{`<MdxImage\n  src="https://..."\n  alt="설명"\n  caption="이미지 캡션"\n/>`}</Code>
                      <Code block>{`<MdxImage\n  src="https://..."\n  alt="설명"\n  width={800}\n  height={400}\n  priority\n/>`}</Code>
                    </Stack>
                    <Text size="xs" c="dimmed" mt={8}>에디터에 이미지를 드래그/붙여넣기하면 자동 업로드됩니다.</Text>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="link">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="cyan" size="sm"><IconExternalLink size={14} /></ThemeIcon>}>
                    <Text size="sm">MdxLink</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>외부 링크 자동 감지 (새 탭 + 아이콘)</Text>
                    <Stack gap={6}>
                      <Code block>{`[링크 텍스트](https://example.com)`}</Code>
                      <Code block>{`[내부 링크](/blog/post-slug)`}</Code>
                    </Stack>
                    <Text size="xs" c="dimmed" mt={8}>마크다운 링크 문법 그대로 사용. 외부 URL은 자동으로 새 탭 + 아이콘 표시.</Text>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="code">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="violet" size="sm"><IconCode size={14} /></ThemeIcon>}>
                    <Text size="sm">코드 블록</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>title: 파일명 표시, 라인 하이라이팅 지원</Text>
                    <Stack gap={6}>
                      <Code block>{`\`\`\`ts title="파일명.ts"\nconst x = 1;\n\`\`\``}</Code>
                      <Code block>{`\`\`\`tsx title="Component.tsx" {3-5}\nimport { useState } from 'react'\n\nfunction App() {\n  const [count, setCount] = useState(0)\n  return <div>{count}</div>\n}\n\`\`\``}</Code>
                    </Stack>
                    <Text size="xs" c="dimmed" mt={8}>지원 언어: ts, tsx, js, jsx, css, html, json, bash, yaml, python, go, rust, sql 등</Text>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="icon">
                  <Accordion.Control icon={<ThemeIcon variant="light" color="orange" size="sm"><IconAlertCircle size={14} /></ThemeIcon>}>
                    <Text size="sm">Icon</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="xs" c="dimmed" mb={8}>name (필수), size (기본 24), color, className</Text>
                    <Stack gap={6}>
                      <Code block>{`<Icon name="AlertCircle" />`}</Code>
                      <Code block>{`<Icon name="AlertCircle" size={16} color="red" />`}</Code>
                    </Stack>
                    <Text size="xs" c="dimmed" mt={8}>lucide-react 아이콘 이름 사용</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my="xl" />

      <Group justify="flex-end" gap="sm">
        {mode === 'edit' && slug && (
          <Button variant="light" leftSection={<IconExternalLink size={14} />} onClick={openPreview} disabled={!previewToken}>
            프리뷰
          </Button>
        )}
        <Button variant="subtle" onClick={() => navigate({ to: '/posts' })}>
          취소
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === 'create' ? '생성' : '저장'}
        </Button>
      </Group>
    </form>
  )
}
