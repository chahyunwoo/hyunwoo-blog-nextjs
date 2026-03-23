import { useNavigate } from '@tanstack/react-router'
import { useCreatePost } from '@/entities/post'
import { CategoryModal } from '@/features/category'
import { PostForm } from '@/features/post'
import type { PostFormValues } from '@/shared/schemas'

export function PostNewPage() {
  const navigate = useNavigate()
  const createPost = useCreatePost()

  const handleSubmit = (values: PostFormValues) => {
    createPost.mutate(
      {
        ...values,
        thumbnailUrl: values.thumbnailUrl || undefined,
        publishedAt: values.publishedAt || undefined,
      },
      {
        onSuccess: () => navigate({ to: '/posts' }),
      },
    )
  }

  return (
    <PostForm
      mode="create"
      onSubmit={handleSubmit}
      isPending={createPost.isPending}
      renderCategoryModal={props => <CategoryModal {...props} />}
    />
  )
}
