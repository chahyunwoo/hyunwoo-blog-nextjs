import { formatDate } from '@hyunwoo/shared/lib'
import { ActionIcon, Badge, Button, Card, Group, Stack, Text, Title, Tooltip } from '@mantine/core'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useDeletePost, usePostList } from '@/entities/post'

export function PostListPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data } = usePostList({ page, limit: 20 })
  const deletePost = useDeletePost()

  const handleDelete = (slug: string, title: string) => {
    if (!window.confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) return
    deletePost.mutate(slug)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Posts</Title>
        <Button component={Link} to="/posts/new" leftSection={<IconPlus size={16} />}>
          새 포스트
        </Button>
      </Group>

      {!data || data.posts.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          포스트가 없습니다.
        </Text>
      ) : (
        <Stack gap="xs">
          {data.posts.map(post => (
            <Card key={post.id} padding="md" radius="md" withBorder>
              <Group justify="space-between" wrap="nowrap">
                <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to="/posts/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none' }}>
                      <Text size="sm" fw={600} lineClamp={1} c="var(--mantine-color-text)">
                        {post.title}
                      </Text>
                    </Link>
                    <Group gap="xs" mt={4}>
                      <Badge variant="light" size="xs">
                        {post.category}
                      </Badge>
                      <Badge color={post.published ? 'teal' : 'gray'} variant="dot" size="xs">
                        {post.published ? '발행' : '임시저장'}
                      </Badge>
                      <Text size="xs" c="dimmed">
                        {formatDate(post.createdAt)}
                      </Text>
                    </Group>
                  </div>
                </Group>
                <Group gap={4} wrap="nowrap">
                  <Tooltip label="수정">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => navigate({ to: '/posts/$slug', params: { slug: post.slug } })}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="삭제">
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      loading={deletePost.isPending}
                      onClick={() => handleDelete(post.slug, post.title)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      )}

      {data && data.totalPages > 1 && (
        <Group justify="center">
          <Button variant="subtle" size="xs" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            이전
          </Button>
          <Text size="sm" c="dimmed">
            {page} / {data.totalPages}
          </Text>
          <Button variant="subtle" size="xs" disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)}>
            다음
          </Button>
        </Group>
      )}
    </Stack>
  )
}
