import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Button,
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
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
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

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[가-힣]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function PostForm({ defaultValues, onSubmit, isPending, mode, slug }: PostFormProps) {
  const navigate = useNavigate()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewToken, setPreviewToken] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  useEffect(() => {
    import('@/entities/auth').then(({ getPreviewToken }) => {
      getPreviewToken().then(setPreviewToken)
    })
  }, [])

  const { data: categoriesData } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => adminApi.get(`api/blog/categories`).json<{ category: string; count: number }[]>(),
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
      slug: '',
      description: '',
      content: '',
      category: '',
      tags: [],
      thumbnailUrl: '',
      published: false,
      ...defaultValues,
    },
  })

  const title = watch('title')

  useEffect(() => {
    if (mode === 'create' && title) {
      setValue('slug', toSlug(title))
    }
  }, [title, mode, setValue])

  const sendPreview = useCallback((value: string) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'mdx-preview', content: value }, BLOG_URL)
  }, [])

  const handleThumbnailUpload = async () => {
    if (!thumbnailFile || !slug) return
    try {
      const formData = new FormData()
      formData.append('thumbnail', thumbnailFile)
      const result = await uploadFile<{ thumbnailUrl: string }>(`api/blog/posts/${slug}/thumbnail`, formData)
      setValue('thumbnailUrl', result.thumbnailUrl)
      setThumbnailFile(null)
      notifications.show({ title: '썸네일 업로드', message: '업로드 완료', color: 'teal' })
    } catch {
      notifications.show({ title: '업로드 실패', message: '썸네일 업로드에 실패했습니다.', color: 'red' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group justify="space-between" mb="lg">
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
              />
            )}
          />
          <Button variant="subtle" onClick={() => navigate({ to: '/posts' })}>
            취소
          </Button>
          <Button type="submit" loading={isPending}>
            {mode === 'create' ? '생성' : '저장'}
          </Button>
        </Group>
      </Group>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Stack gap="md">
            <TextInput label="제목" placeholder="포스트 제목" error={errors.title?.message} {...register('title')} />

            <TextInput
              label="Slug"
              placeholder="auto-generated-from-title"
              description={mode === 'create' ? '제목에서 자동 생성됩니다' : 'URL 경로 (수정 불가)'}
              error={errors.slug?.message}
              disabled={mode === 'edit'}
              {...register('slug')}
            />

            <Textarea
              label="설명"
              placeholder="포스트 설명 (25-50자)"
              autosize
              minRows={2}
              error={errors.description?.message}
              {...register('description')}
            />

            <div>
              <Text size="sm" fw={500} mb={4}>
                내용 (MDX)
              </Text>
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
                    height="500px"
                    defaultLanguage="mdx"
                    value={field.value}
                    onChange={value => {
                      field.onChange(value ?? '')
                      sendPreview(value ?? '')
                    }}
                    theme="vs-dark"
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
                    }}
                  />
                )}
              />
            </div>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Stack gap="md">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  label="카테고리"
                  placeholder="카테고리 입력 또는 선택"
                  description="기존 카테고리 선택 또는 자유 입력"
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
                  placeholder="Enter로 태그 추가"
                  description="기존 태그 자동완성 + 새 태그 자유 입력"
                  data={tagOptions}
                  error={errors.tags?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {mode === 'edit' && slug && (
              <div>
                <Text size="sm" fw={500} mb={4}>
                  썸네일
                </Text>
                <Group>
                  <FileInput
                    placeholder="이미지 파일 선택"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    value={thumbnailFile}
                    onChange={setThumbnailFile}
                    style={{ flex: 1 }}
                  />
                  <Button variant="light" disabled={!thumbnailFile} onClick={handleThumbnailUpload}>
                    업로드
                  </Button>
                </Group>
                <Text size="xs" c="dimmed" mt={4}>
                  1200x630 권장, 5MB 제한
                </Text>
              </div>
            )}

            <TextInput
              label="썸네일 URL"
              placeholder="파일 업로드 시 자동 입력됩니다"
              description="직접 URL 입력도 가능합니다"
              error={errors.thumbnailUrl?.message}
              {...register('thumbnailUrl')}
            />

            <div>
              <Text size="sm" fw={500} mb={4}>
                프리뷰
              </Text>
              <iframe
                ref={iframeRef}
                src={previewToken ? `${BLOG_URL}/preview?token=${previewToken}` : undefined}
                title="MDX Preview"
                style={{
                  width: '100%',
                  height: '500px',
                  border: '1px solid var(--mantine-color-default-border)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'var(--mantine-color-body)',
                }}
              />
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </form>
  )
}
