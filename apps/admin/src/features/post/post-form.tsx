import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Badge,
  Button,
  Card,
  FileInput,
  Grid,
  Group,
  Image,
  Stack,
  Switch,
  TagsInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { notifications } from '@mantine/notifications'
import Editor, { type Monaco } from '@monaco-editor/react'
import { IconCalendar, IconExternalLink, IconPhoto, IconUpload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { adminApi, uploadFile } from '@/shared/api'
import { BLOG_URL } from '@/shared/config'
import { draculaTheme } from '@/shared/config/editor-theme'
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
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
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
      publishedAt: '',
      ...defaultValues,
    },
  })

  const thumbnailUrl = watch('thumbnailUrl')

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

  const handleThumbnailUpload = async () => {
    if (!thumbnailFile) return
    setThumbnailUploading(true)
    const url = await handleImageUpload(thumbnailFile)
    if (url) {
      setValue('thumbnailUrl', url)
      setThumbnailFile(null)
      notifications.show({ title: '썸네일 업로드', message: '업로드 완료', color: 'teal' })
    }
    setThumbnailUploading(false)
  }

  const openPreview = () => {
    if (!slug || !previewToken) return
    window.open(`${BLOG_URL}/preview/${slug}?token=${previewToken}`, '_blank')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group justify="space-between" mb="xl" align="center">
        <Group gap="sm">
          <Title order={2}>{mode === 'create' ? '새 포스트' : '포스트 수정'}</Title>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Badge
                color={field.value ? 'teal' : 'gray'}
                variant="light"
                size="lg"
                style={{ cursor: 'pointer' }}
                onClick={() => field.onChange(!field.value)}
              >
                {field.value ? '발행' : '임시저장'}
              </Badge>
            )}
          />
        </Group>
        <Group gap="xs">
          {mode === 'edit' && slug && (
            <Button
              variant="light"
              size="sm"
              leftSection={<IconExternalLink size={14} />}
              onClick={openPreview}
              disabled={!previewToken}
            >
              프리뷰
            </Button>
          )}
          <Button variant="subtle" size="sm" onClick={() => navigate({ to: '/posts' })}>
            취소
          </Button>
          <Button type="submit" size="sm" loading={isPending}>
            {mode === 'create' ? '생성' : '저장'}
          </Button>
        </Group>
      </Group>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            <TextInput
              label="제목"
              placeholder="포스트 제목"
              size="md"
              error={errors.title?.message}
              {...register('title')}
            />

            <TextInput
              label="설명"
              placeholder="미입력 시 본문에서 자동 추출"
              error={errors.description?.message}
              {...register('description')}
            />

            <div>
              {errors.content && (
                <Text size="xs" c="red" mb={4}>
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
                    beforeMount={(monaco: Monaco) => {
                      monaco.editor.defineTheme('dracula', draculaTheme)
                    }}
                    theme="dracula"
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
              <Group mt="xs" gap="xl">
                <Text size="xs" c="dimmed" ff="monospace">{`<Callout type="tip">내용</Callout>`}</Text>
                <Text size="xs" c="dimmed" ff="monospace">{`<Highlight color="fuchsia">강조</Highlight>`}</Text>
                <Text size="xs" c="dimmed" ff="monospace">{`<MdxImage src="url" alt="" caption="" />`}</Text>
              </Group>
            </div>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Stack gap="md">
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
                      value={field.value ? new Date(field.value) : null}
                      onChange={date => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Text size="sm" fw={500} mb="sm">
                썸네일
              </Text>
              {thumbnailUrl ? (
                <Stack gap="xs">
                  <Image src={thumbnailUrl} alt="썸네일" radius="md" h={160} fit="cover" />
                  <Button variant="subtle" size="xs" color="red" onClick={() => setValue('thumbnailUrl', '')}>
                    제거
                  </Button>
                </Stack>
              ) : (
                <Group>
                  <FileInput
                    placeholder="이미지 선택"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    leftSection={<IconPhoto size={16} />}
                    value={thumbnailFile}
                    onChange={setThumbnailFile}
                    style={{ flex: 1 }}
                  />
                  <Button
                    variant="light"
                    leftSection={<IconUpload size={14} />}
                    disabled={!thumbnailFile}
                    loading={thumbnailUploading}
                    onClick={handleThumbnailUpload}
                  >
                    업로드
                  </Button>
                </Group>
              )}
              <Text size="xs" c="dimmed" mt="xs">
                1200x630 권장 (OG 이미지)
              </Text>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </form>
  )
}
