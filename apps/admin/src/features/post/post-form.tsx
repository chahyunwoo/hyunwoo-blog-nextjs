import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Button,
  Card,
  FileInput,
  Grid,
  Group,
  Stack,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import Editor from '@monaco-editor/react'
import { IconExternalLink } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { adminApi, uploadFile } from '@/shared/api'
import { BLOG_URL } from '@/shared/config'
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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [previewToken, setPreviewToken] = useState<string | null>(null)

  useEffect(() => {
    import('@/entities/auth').then(({ getPreviewToken }) => {
      getPreviewToken().then(setPreviewToken)
    })
  }, [])

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
      ...defaultValues,
    },
  })

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      const result = await uploadFile<{ url: string }>('api/blog/images', formData)
      notifications.show({ title: '이미지 업로드', message: '업로드 완료', color: 'teal' })
      return result.url
    } catch {
      notifications.show({ title: '이미지 업로드 실패', message: '10MB 이하 이미지만 가능합니다.', color: 'red' })
      return null
    }
  }

  const openPreview = () => {
    if (!slug || !previewToken) return
    window.open(`${BLOG_URL}/preview/${slug}?token=${previewToken}`, '_blank')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group justify="space-between" mb="xl">
        <Title order={2}>{mode === 'create' ? '새 포스트' : '포스트 수정'}</Title>
        <Group>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Switch
                label={field.value ? '발행' : '임시저장'}
                checked={field.value}
                onChange={field.onChange}
                color="teal"
                size="md"
              />
            )}
          />
          {mode === 'edit' && slug && (
            <Button
              variant="light"
              leftSection={<IconExternalLink size={16} />}
              onClick={openPreview}
              disabled={!previewToken}
            >
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
      </Group>

      <Stack gap="xl">
        <Card shadow="xs" padding="xl" radius="md" withBorder>
          <Title order={5} mb="md">
            기본 정보
          </Title>
          <Grid gutter="md">
            <Grid.Col span={12}>
              <TextInput
                label="제목"
                placeholder="포스트 제목"
                size="md"
                error={errors.title?.message}
                {...register('title')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="설명"
                placeholder="포스트 설명 (목록/OG 카드에 표시)"
                autosize
                minRows={2}
                error={errors.description?.message}
                {...register('description')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    label="카테고리"
                    placeholder="선택 또는 입력"
                    data={categoryOptions}
                    error={errors.category?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
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
            </Grid.Col>
          </Grid>
        </Card>

        <Card shadow="xs" padding="xl" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={5}>썸네일</Title>
            <Text size="xs" c="dimmed">
              1200x630 권장, 5MB 제한
            </Text>
          </Group>
          <Group>
            <FileInput
              placeholder="썸네일 이미지 선택 (1200x630)"
              accept="image/jpeg,image/png,image/webp,image/gif"
              value={thumbnailFile}
              onChange={setThumbnailFile}
              style={{ flex: 1 }}
            />
            <Button
              variant="light"
              disabled={!thumbnailFile}
              onClick={async () => {
                if (!thumbnailFile) return
                const url = await handleImageUpload(thumbnailFile)
                if (url) {
                  setValue('thumbnailUrl', url)
                  setThumbnailFile(null)
                }
              }}
            >
              업로드
            </Button>
          </Group>
          {watch('thumbnailUrl') && (
            <Group mt="xs" gap="xs">
              <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
                {watch('thumbnailUrl')}
              </Text>
            </Group>
          )}
        </Card>

        <Card shadow="xs" padding="xl" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={5}>내용 (MDX)</Title>
            <Text size="xs" c="dimmed">
              이미지: 에디터에 파일을 드래그하거나 붙여넣기하면 자동 업로드됩니다
            </Text>
          </Group>
          {errors.content && (
            <Text size="xs" c="red" mb="xs">
              {errors.content.message}
            </Text>
          )}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                height="600px"
                defaultLanguage="markdown"
                value={field.value}
                onChange={value => field.onChange(value ?? '')}
                theme="vs-dark"
                onMount={editor => {
                  const dom = editor.getDomNode()
                  if (!dom) return

                  const insertImage = async (file: File) => {
                    const url = await handleImageUpload(file)
                    if (!url) return
                    const position = editor.getPosition()
                    if (!position) return
                    editor.executeEdits('', [
                      {
                        range: {
                          startLineNumber: position.lineNumber,
                          startColumn: position.column,
                          endLineNumber: position.lineNumber,
                          endColumn: position.column,
                        },
                        text: `\n<MdxImage src="${url}" alt="" caption="" />\n`,
                      },
                    ])
                  }

                  dom.addEventListener('paste', async (e: Event) => {
                    const ce = e as ClipboardEvent
                    const file = ce.clipboardData?.files[0]
                    if (!file?.type.startsWith('image/')) return
                    ce.preventDefault()
                    ce.stopPropagation()
                    insertImage(file)
                  })

                  dom.addEventListener(
                    'dragover',
                    (e: Event) => {
                      e.preventDefault()
                      e.stopPropagation()
                    },
                    true,
                  )

                  dom.addEventListener(
                    'drop',
                    async (e: Event) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const de = e as DragEvent
                      const file = de.dataTransfer?.files[0]
                      if (!file?.type.startsWith('image/')) return
                      insertImage(file)
                    },
                    true,
                  )
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
          <Card mt="md" padding="md" radius="md" bg="var(--mantine-color-dark-7)">
            <Text size="xs" c="dimmed" fw={600} mb={4}>
              사용 가이드
            </Text>
            <Group gap="xl">
              <Stack gap={2}>
                <Text size="xs" c="dimmed" ff="monospace">{`<Callout type="tip">내용</Callout>`}</Text>
                <Text size="xs" c="dimmed" ff="monospace">{`<Highlight color="fuchsia">강조</Highlight>`}</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed" ff="monospace">{`<MdxImage src="url" alt="" caption="" />`}</Text>
                <Text size="xs" c="dimmed" ff="monospace">{`\`\`\`ts title="파일명.ts"\n코드\n\`\`\``}</Text>
              </Stack>
            </Group>
          </Card>
        </Card>
      </Stack>
    </form>
  )
}
