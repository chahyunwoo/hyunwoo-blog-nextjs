import { Card, Group, Text, ThemeIcon } from '@mantine/core'
import type { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: number
  color: string
}

export function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Card shadow="xs" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={4}>
            {label}
          </Text>
          <Text size="xl" fw={700}>
            {value.toLocaleString()}
          </Text>
        </div>
        <ThemeIcon variant="light" color={color} size="lg" radius="md">
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  )
}
