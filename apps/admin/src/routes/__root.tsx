import {
  ActionIcon,
  AppShell,
  Burger,
  Center,
  Group,
  Loader,
  NavLink,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconClock, IconLogout } from '@tabler/icons-react'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { logout, refreshSession, setAuthenticated, useAuth, useSessionTimer } from '@/entities/auth'
import { LOGIN_PATH } from '@/shared/config'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})

function RootLayout() {
  const matchRoute = useMatchRoute()
  const isLoginPage = matchRoute({ to: LOGIN_PATH })
  const { initialized } = useAuth()

  useEffect(() => {
    if (initialized) return
    if (isLoginPage) {
      setAuthenticated(false)
    } else {
      refreshSession()
    }
  }, [initialized, isLoginPage])

  if (!initialized) {
    return (
      <Center mih="100vh">
        <Loader />
      </Center>
    )
  }

  if (isLoginPage) {
    return <Outlet />
  }

  return <AuthenticatedLayout />
}

function AuthenticatedLayout() {
  const [opened, { toggle }] = useDisclosure()
  const { isAuthenticated } = useAuth()
  const { display, showWarning, extend } = useSessionTimer()

  if (!isAuthenticated) {
    window.location.href = LOGIN_PATH
    return null
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg">
              hyunwoo.dev
            </Text>
          </Group>
          <Group gap="sm">
            <Tooltip label="세션 연장" position="bottom">
              <UnstyledButton onClick={extend}>
                <Group gap={6}>
                  <IconClock
                    size={16}
                    color={showWarning ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-blue-4)'}
                  />
                  <Text size="xs" ff="monospace" c={showWarning ? 'red' : 'blue.4'} fw={showWarning ? 700 : 500}>
                    {display}
                  </Text>
                </Group>
              </UnstyledButton>
            </Tooltip>
            <Tooltip label="로그아웃" position="bottom">
              <ActionIcon variant="subtle" color="gray" onClick={logout}>
                <IconLogout size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink component={Link} to="/" label="Dashboard" />
        <NavLink component={Link} to="/posts" label="Posts" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
