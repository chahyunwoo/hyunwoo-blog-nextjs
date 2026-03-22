import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPostBySlug, getPublishedPosts } from '@/entities/post'

const mockPost = {
  id: 1,
  slug: 'test-post',
  title: 'Test Post',
  description: 'Test description',
  content: '# Hello',
  category: 'Frontend',
  thumbnailUrl: '/thumbnail/test.png',
  published: true,
  createdAt: '2026-03-20',
  updatedAt: '2026-03-20',
  tags: [{ id: 1, name: 'React' }],
}

const mockFetch = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getPostBySlug', () => {
  it('should return null for non-existent slug', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    const result = await getPostBySlug('non-existent')
    expect(result).toBeNull()
  })

  it('should return mapped post for existing slug', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPost),
    })
    const result = await getPostBySlug('test-post')
    expect(result).not.toBeNull()
    expect(result?.meta.title).toBe('Test Post')
    expect(result?.meta.slug).toBe('test-post')
    expect(result?.meta.mainTag).toBe('Frontend')
    expect(result?.meta.tags).toEqual(['React'])
    expect(result?.meta.date).toBe('2026-03-20')
    expect(result?.content).toBe('# Hello')
  })

  it('should return null on fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const result = await getPostBySlug('test-post')
    expect(result).toBeNull()
  })
})

describe('getPublishedPosts', () => {
  it('should return mapped posts from API', async () => {
    const posts = [
      { ...mockPost, slug: 'newer', createdAt: '2026-03-20' },
      { ...mockPost, slug: 'older', createdAt: '2026-03-10' },
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ posts, total: 2, page: 1, limit: 50, totalPages: 1 }),
    })

    const result = await getPublishedPosts()
    expect(result).toHaveLength(2)
    expect(result[0].meta.slug).toBe('newer')
    expect(result[1].meta.slug).toBe('older')
  })

  it('should return all posts from API response', async () => {
    const posts = [
      { ...mockPost, slug: 'post-1' },
      { ...mockPost, slug: 'post-2' },
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ posts, total: 2, page: 1, limit: 50, totalPages: 1 }),
    })

    const result = await getPublishedPosts()
    expect(result).toHaveLength(2)
  })

  it('should return empty array on fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const result = await getPublishedPosts()
    expect(result).toEqual([])
  })
})
