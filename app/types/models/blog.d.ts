import type { Pagination } from "~/types"

export interface Blog {
  readonly id: string
  title: string,
  slug: string,
  content: string,
  author: string,
  thumbnail: string,
  status: number,
  meta_title: string,
  meta_description: string,
  keywords: string,
  published_at: string,
  created_at: string
}

export type BlogResponse = {
  blogs: Blog[]
  pagination?: Pagination
}