import { formatDate } from '@hyunwoo/shared/lib'
import {
  Badge,
  Card,
  Grid,
  Group,
  Loader,
  Progress,
  RingProgress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconArticle,
  IconCategory,
  IconClock,
  IconDatabase,
  IconEye,
  IconFileText,
  IconLink,
  IconServer,
  IconUsers,
} from '@tabler/icons-react'
import {
  useAdminLogs,
  useDashboard,
  usePopularPages,
  usePopularPosts,
  useReferrers,
  useSystemInfo,
  useVisitors,
} from '@/entities/analytics'
import { StatCard } from '@/shared/ui/stat-card'

export function DashboardPage() {
  const { data: dashboard, isLoading: dashLoading } = useDashboard()
  const { data: visitors } = useVisitors(30, 'blog')
  const { data: todayVisitors } = useVisitors(1, 'blog')
  const { data: popularPosts } = usePopularPosts(5)
  const { data: referrers } = useReferrers(30, 'blog')
  const { data: popularPages } = usePopularPages(30, 'blog', 10)
  const { data: adminLogs } = useAdminLogs(5)
  const { data: system } = useSystemInfo()

  if (dashLoading) {
    return (
      <Stack align="center" justify="center" mih={400}>
        <Loader />
      </Stack>
    )
  }

  const stats = dashboard?.postStats ?? { total: 0, published: 0, draft: 0 }
  const memoryPercent = system ? Math.round((system.memory.heapUsed / system.memory.heapTotal) * 100) : 0

  return (
    <Stack gap="xl">
      <Title order={2}>Dashboard</Title>

      <SimpleGrid cols={{ base: 2, lg: 4 }}>
        <StatCard icon={<IconFileText size={22} />} label="전체 포스트" value={stats.total} color="blue" />
        <StatCard icon={<IconArticle size={22} />} label="발행됨" value={stats.published} color="teal" />
        <StatCard
          icon={<IconEye size={22} />}
          label="오늘 방문자"
          value={todayVisitors?.uniqueVisitors ?? 0}
          color="violet"
        />
        <StatCard
          icon={<IconUsers size={22} />}
          label="30일 순 방문자"
          value={visitors?.uniqueVisitors ?? 0}
          color="indigo"
        />
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="blue" size="md" radius="md">
                <IconCategory size={16} />
              </ThemeIcon>
              <Title order={5}>카테고리 분포</Title>
            </Group>
            {!dashboard?.categoryStats.length ? (
              <Text c="dimmed" size="sm" ta="center" py="xl">
                데이터 없음
              </Text>
            ) : (
              <Stack gap="sm">
                {dashboard.categoryStats.map(cat => {
                  const percent = stats.total > 0 ? Math.round((cat.count / stats.total) * 100) : 0
                  return (
                    <div key={cat.category}>
                      <Group justify="space-between" mb={4}>
                        <Text size="sm" fw={500}>
                          {cat.category}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {cat.count}개 ({percent}%)
                        </Text>
                      </Group>
                      <Progress value={percent} size="md" color="blue" radius="xl" />
                    </div>
                  )
                })}
              </Stack>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="cyan" size="md" radius="md">
                <IconServer size={16} />
              </ThemeIcon>
              <Title order={5}>서버 상태</Title>
            </Group>
            {system ? (
              <Stack align="center" gap="lg" py="sm">
                <RingProgress
                  size={130}
                  thickness={14}
                  roundCaps
                  sections={[{ value: memoryPercent, color: memoryPercent > 80 ? 'red' : 'cyan' }]}
                  label={
                    <Text ta="center" size="lg" fw={700}>
                      {memoryPercent}%
                    </Text>
                  }
                />
                <Stack gap={4} align="center">
                  <Text size="xs" c="dimmed">
                    힙: {system.memory.heapUsed}MB / {system.memory.heapTotal}MB
                  </Text>
                  <Text size="xs" c="dimmed">
                    RSS: {system.memory.rss}MB
                  </Text>
                </Stack>
                <Group gap="md">
                  <Badge
                    leftSection={<IconDatabase size={12} />}
                    color={system.database === 'ok' ? 'teal' : 'red'}
                    variant="light"
                    size="lg"
                  >
                    DB {system.database}
                  </Badge>
                  <Badge variant="light" color="gray" size="lg">
                    {system.uptimeFormatted}
                  </Badge>
                </Group>
              </Stack>
            ) : (
              <Stack align="center" py="xl">
                <Loader size="sm" />
              </Stack>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="violet" size="md" radius="md">
                <IconEye size={16} />
              </ThemeIcon>
              <Title order={5}>인기 포스트</Title>
            </Group>
            {!popularPosts?.length ? (
              <Text c="dimmed" size="sm" ta="center" py="lg">
                데이터 없음
              </Text>
            ) : (
              <Table verticalSpacing="sm">
                <Table.Tbody>
                  {popularPosts.map((post, i) => (
                    <Table.Tr key={post.slug}>
                      <Table.Td w={30}>
                        <Badge variant="filled" color={i < 3 ? 'violet' : 'gray'} size="sm" circle>
                          {i + 1}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" lineClamp={1}>
                          {post.title}
                        </Text>
                      </Table.Td>
                      <Table.Td w={70} ta="right">
                        <Text size="xs" c="dimmed" ff="monospace">
                          {post.viewCount.toLocaleString()}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="teal" size="md" radius="md">
                <IconArticle size={16} />
              </ThemeIcon>
              <Title order={5}>최근 포스트</Title>
            </Group>
            {!dashboard?.recentPosts.length ? (
              <Text c="dimmed" size="sm" ta="center" py="lg">
                데이터 없음
              </Text>
            ) : (
              <Table verticalSpacing="sm">
                <Table.Tbody>
                  {dashboard.recentPosts.map(post => (
                    <Table.Tr key={post.slug}>
                      <Table.Td>
                        <Stack gap={2}>
                          <Text size="sm" lineClamp={1}>
                            {post.title}
                          </Text>
                          <Group gap="xs">
                            <Badge size="xs" variant="light">
                              {post.category}
                            </Badge>
                            <Text size="xs" c="dimmed">
                              {formatDate(post.createdAt)}
                            </Text>
                          </Group>
                        </Stack>
                      </Table.Td>
                      <Table.Td w={60} ta="right">
                        <Group gap={4} justify="flex-end">
                          <IconEye size={12} color="gray" />
                          <Text size="xs" c="dimmed" ff="monospace">
                            {post.viewCount.toLocaleString()}
                          </Text>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="orange" size="md" radius="md">
                <IconLink size={16} />
              </ThemeIcon>
              <Title order={5}>유입 경로 (30일)</Title>
            </Group>
            {!referrers?.length ? (
              <Text c="dimmed" size="sm" ta="center" py="lg">
                데이터 없음
              </Text>
            ) : (
              <Table verticalSpacing="sm">
                <Table.Tbody>
                  {referrers.map(ref => (
                    <Table.Tr key={ref.referrer}>
                      <Table.Td>
                        <Text size="sm">{ref.referrer}</Text>
                      </Table.Td>
                      <Table.Td w={60} ta="right">
                        <Text size="xs" c="dimmed" ff="monospace">
                          {ref.count}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="xl" radius="md" withBorder h="100%">
            <Group mb="lg">
              <ThemeIcon variant="light" color="gray" size="md" radius="md">
                <IconClock size={16} />
              </ThemeIcon>
              <Title order={5}>관리자 활동</Title>
            </Group>
            {!adminLogs?.length ? (
              <Text c="dimmed" size="sm" ta="center" py="lg">
                활동 없음
              </Text>
            ) : (
              <Table verticalSpacing="sm">
                <Table.Tbody>
                  {adminLogs.map(log => (
                    <Table.Tr key={log.id}>
                      <Table.Td>
                        <Group gap="xs">
                          <Badge
                            size="xs"
                            color={log.action === 'create' ? 'teal' : log.action === 'delete' ? 'red' : 'blue'}
                            variant="light"
                          >
                            {log.action}
                          </Badge>
                          <Text size="sm">
                            {log.entity} #{log.entityId}
                          </Text>
                        </Group>
                      </Table.Td>
                      <Table.Td w={100} ta="right">
                        <Text size="xs" c="dimmed">
                          {formatDate(log.createdAt)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Card shadow="xs" padding="xl" radius="md" withBorder>
        <Group mb="lg">
          <ThemeIcon variant="light" color="pink" size="md" radius="md">
            <IconEye size={16} />
          </ThemeIcon>
          <Title order={5}>인기 페이지 (30일)</Title>
        </Group>
        {!popularPages?.length ? (
          <Text c="dimmed" size="sm" ta="center" py="lg">
            데이터 없음
          </Text>
        ) : (
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>페이지</Table.Th>
                <Table.Th w={80} ta="right">
                  조회수
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {popularPages.map(page => (
                <Table.Tr key={page.path}>
                  <Table.Td>
                    <Text size="sm" ff="monospace">
                      {page.path}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Text size="xs" c="dimmed" ff="monospace">
                      {page.count.toLocaleString()}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </Stack>
  )
}
