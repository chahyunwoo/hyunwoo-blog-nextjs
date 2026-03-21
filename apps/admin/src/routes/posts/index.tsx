import { formatDate } from '@hyunwoo/shared/lib'
import { Badge, Button, Group, Table, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useDeletePost, usePostList } from '@/entities/post'

export const Route = createFileRoute('/posts/')({
  component: PostListPage,
})

function PostListPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = usePostList({ page, limit: 20 })
  const deletePost = useDeletePost()

  const handleDelete = (slug: string, title: string) => {
    if (!window.confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) return

    deletePost.mutate(slug, {
      onSuccess: () => {
        notifications.show({ title: '삭제 완료', message: `"${title}" 포스트가 삭제되었습니다.`, color: 'green' })
      },
      onError: e => {
        notifications.show({ title: '삭제 실패', message: e.message, color: 'red' })
      },
    })
  }

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Posts</Title>
        <Button component={Link} to="/posts/new">
          새 포스트
        </Button>
      </Group>

      {isLoading ? (
        <Text c="dimmed">로딩 중...</Text>
      ) : !data || data.posts.length === 0 ? (
        <Text c="dimmed">포스트가 없습니다.</Text>
      ) : (
        <>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>제목</Table.Th>
                <Table.Th>카테고리</Table.Th>
                <Table.Th>상태</Table.Th>
                <Table.Th>작성일</Table.Th>
                <Table.Th w={100}>관리</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.posts.map(post => (
                <Table.Tr key={post.id}>
                  <Table.Td>
                    <Link to="/posts/$slug" params={{ slug: post.slug }} style={{ textDecoration: 'none' }}>
                      <Text size="sm" fw={500} c="blue">
                        {post.title}
                      </Text>
                    </Link>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" size="sm">
                      {post.category}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={post.published ? 'green' : 'gray'} variant="dot" size="sm">
                      {post.published ? '발행' : '임시저장'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      {formatDate(post.createdAt)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button
                        component={Link}
                        to="/posts/$slug"
                        params={{ slug: post.slug }}
                        variant="subtle"
                        size="xs"
                      >
                        수정
                      </Button>
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        loading={deletePost.isPending}
                        onClick={() => handleDelete(post.slug, post.title)}
                      >
                        삭제
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {data.totalPages > 1 && (
            <Group justify="center" mt="lg">
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
        </>
      )}
    </>
  )
}
