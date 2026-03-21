import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import type { LucideIcon } from 'lucide-react'
import * as icons from 'lucide-react'
import { useState } from 'react'
import {
  type Category,
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/entities/category'
import { ICON_LIST } from '@/shared/config/icon-list'

interface CategoryModalProps {
  opened: boolean
  onClose: () => void
  onSelect?: (category: string) => void
}

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Folder
}

export function CategoryModal({ opened, onClose, onSelect }: CategoryModalProps) {
  const { data: categories } = useCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [name, setName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('Folder')
  const [iconSearch, setIconSearch] = useState('')

  const filteredIcons = iconSearch
    ? ICON_LIST.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase()))
    : ICON_LIST

  const resetForm = () => {
    setName('')
    setSelectedIcon('Folder')
    setIconSearch('')
    setMode('list')
    setEditTarget(null)
  }

  const handleCreate = () => {
    if (!name.trim()) return
    createCategory.mutate({ name: name.trim(), icon: selectedIcon }, { onSuccess: () => resetForm() })
  }

  const handleUpdate = () => {
    if (!editTarget || !name.trim()) return
    const nameChanged = editTarget.category !== name.trim()
    if (nameChanged && editTarget.count > 0) {
      if (
        !window.confirm(
          `"${editTarget.category}" → "${name.trim()}" 변경 시 ${editTarget.count}개 포스트의 카테고리도 함께 변경됩니다. 계속하시겠습니까?`,
        )
      )
        return
    }
    updateCategory.mutate(
      { category: editTarget.category, name: name.trim(), icon: selectedIcon },
      { onSuccess: () => resetForm() },
    )
  }

  const handleDelete = (cat: Category) => {
    if (cat.count > 0) {
      notifications.show({
        title: '삭제 불가',
        message: `"${cat.category}" 카테고리에 ${cat.count}개의 포스트가 있습니다. 포스트를 먼저 다른 카테고리로 이동하세요.`,
        color: 'red',
      })
      return
    }
    if (!window.confirm(`"${cat.category}" 카테고리를 삭제하시겠습니까?`)) return
    deleteCategory.mutate(cat.category)
  }

  const startEdit = (cat: Category) => {
    setMode('edit')
    setEditTarget(cat)
    setName(cat.category)
    setSelectedIcon(cat.icon)
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose()
        resetForm()
      }}
      title="카테고리 관리"
      size="md"
    >
      {mode === 'list' ? (
        <Stack gap="sm">
          {categories?.map(cat => {
            const Icon = getIcon(cat.icon)
            return (
              <Group
                key={cat.category}
                justify="space-between"
                p="xs"
                style={{
                  borderRadius: 'var(--mantine-radius-md)',
                  border: '1px solid var(--mantine-color-default-border)',
                }}
              >
                <Group
                  gap="sm"
                  style={{ cursor: onSelect ? 'pointer' : 'default', flex: 1 }}
                  onClick={() => {
                    if (onSelect) {
                      onSelect(cat.category)
                      onClose()
                      resetForm()
                    }
                  }}
                >
                  <Icon size={18} />
                  <Text size="sm" fw={500}>
                    {cat.category}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {cat.count}개
                  </Text>
                </Group>
                <Group gap={4}>
                  <Tooltip label="수정">
                    <ActionIcon variant="subtle" size="sm" onClick={() => startEdit(cat)}>
                      <IconEdit size={14} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label={cat.count > 0 ? `${cat.count}개 포스트 사용 중` : '삭제'}>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="sm"
                      disabled={cat.count > 0}
                      onClick={() => handleDelete(cat)}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            )
          })}

          <Button
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={() => setMode('create')}
            fullWidth
            mt="xs"
          >
            새 카테고리
          </Button>
        </Stack>
      ) : (
        <Stack gap="md">
          <TextInput
            label="카테고리 이름"
            placeholder="카테고리 이름"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />

          <Box>
            <Text size="sm" fw={500} mb={8}>
              아이콘
            </Text>
            <TextInput
              placeholder="아이콘 검색..."
              size="xs"
              mb="xs"
              value={iconSearch}
              onChange={e => setIconSearch(e.currentTarget.value)}
            />
            <Box
              style={{
                maxHeight: 200,
                overflow: 'auto',
                border: '1px solid var(--mantine-color-default-border)',
                borderRadius: 'var(--mantine-radius-md)',
                padding: 8,
              }}
            >
              <SimpleGrid cols={8} spacing={4}>
                {filteredIcons.map(iconName => {
                  const Icon = getIcon(iconName)
                  const isSelected = selectedIcon === iconName
                  return (
                    <Tooltip key={iconName} label={iconName} position="top">
                      <UnstyledButton
                        onClick={() => setSelectedIcon(iconName)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--mantine-radius-md)',
                          border: isSelected ? '2px solid var(--mantine-color-indigo-filled)' : '1px solid transparent',
                          background: isSelected ? 'var(--mantine-color-indigo-light)' : undefined,
                        }}
                      >
                        <Icon size={18} />
                      </UnstyledButton>
                    </Tooltip>
                  )
                })}
              </SimpleGrid>
            </Box>
            <Text size="xs" c="dimmed" mt={4}>
              선택됨: {selectedIcon}
            </Text>
          </Box>

          <Divider />

          <Group justify="flex-end" gap="xs">
            <Button variant="subtle" onClick={resetForm}>
              취소
            </Button>
            <Button
              onClick={mode === 'create' ? handleCreate : handleUpdate}
              loading={createCategory.isPending || updateCategory.isPending}
            >
              {mode === 'create' ? '생성' : '수정'}
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  )
}
