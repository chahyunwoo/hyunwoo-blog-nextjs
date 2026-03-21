export type { PaginatedPosts } from './api/post.api'
export {
  getCategoriesWithTags,
  getPaginatedPosts,
  getPostBySlug,
  getPublishedPosts,
  getRecentPosts,
  getRelatedPosts,
  getTagCloud,
} from './api/post.api'
export type {
  ApiCategory,
  ApiPost,
  ApiPostsResponse,
  ApiRelatedResponse,
  ApiTagsResponse,
} from './model'
