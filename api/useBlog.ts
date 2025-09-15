import type { BlogResponse, Blog } from '~/types'
import { useApi } from '@/api/useApi'

export const useBlog = () => {
  const api = useApi()

  const getBlogs = async (page?: number, per_page?: number) => {
    const response = await api.GET<BlogResponse>("blogs/published", {
      page: page || 1,
      per_page: per_page || 12,
    })
    if (response && response.success) {    
      return response.data
    }
  }

  const detailBlog = async (slug: string) => {
    const response = await api.GET<Blog>(`blogs/${slug}`)

    if (response && response.success) {
      return response.data
    }
  }

  const getRelatedBlogs = async (
    page?: number,
    per_page?: number,
    sort_by?: "latest" | "views",
    limit?: number,
  ) => {
    const response = await api.GET<BlogResponse>("blogs/related", {
      sort_by: sort_by || "latest",
      limit: limit || 5,
    })
    if (response && response.success) {
      return response.data
    }
  }

  return {
    getBlogs,
    detailBlog,
    getRelatedBlogs
  }
}