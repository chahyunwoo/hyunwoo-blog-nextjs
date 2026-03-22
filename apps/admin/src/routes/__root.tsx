import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@hyunwoo/ui'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useMatchRoute } from '@tanstack/react-router'
import { Clock, FileText, LayoutDashboard, Loader2, LogOut, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { logout, refreshSession, setAuthenticated, useAuth, useSessionTimer } from '@/entities/auth'
import { LOGIN_PATH } from '@/shared/config'
import { NavItem } from '@/shared/ui'

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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  if (isLoginPage) {
    return <Outlet />
  }

  return <AuthenticatedLayout />
}

function AuthenticatedLayout() {
  const [opened, setOpened] = useState(false)
  const { isAuthenticated } = useAuth()
  const { display, showWarning, extend } = useSessionTimer()

  if (!isAuthenticated) {
    window.location.href = LOGIN_PATH
    return null
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setOpened(prev => !prev)}>
            {opened ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <span className="text-lg font-bold">hyunwoo.dev</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" onClick={extend} className="flex items-center gap-1.5 cursor-pointer px-2">
                  <Clock className={`size-4 ${showWarning ? 'text-red-500' : 'text-blue-400'}`} />
                  <span
                    className={`text-xs font-mono ${showWarning ? 'text-red-500 font-bold' : 'text-blue-400 font-medium'}`}
                  >
                    {display}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>세션 연장</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="size-[18px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>로그아웃</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <div className="flex">
        <nav
          className={`${
            opened ? 'block' : 'hidden'
          } sm:block fixed sm:sticky top-[60px] left-0 z-40 w-60 shrink-0 border-r bg-background p-4 h-[calc(100vh-60px)] overflow-y-auto`}
        >
          <div className="flex flex-col gap-1">
            <NavItem to="/" label="Dashboard" icon={<LayoutDashboard className="size-4" />} />
            <NavItem to="/posts" label="Posts" icon={<FileText className="size-4" />} />
          </div>
        </nav>

        {opened && (
          <div
            className="fixed inset-0 z-30 bg-black/50 sm:hidden"
            onClick={() => setOpened(false)}
            aria-hidden="true"
          />
        )}

        <main className="flex-1 p-6 md:p-8 min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
