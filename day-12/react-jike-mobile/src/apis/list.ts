// 1. 定义泛型
import {http} from '@/utils'
import type {ResType} from './shared'


// 2. 定义具体接口类型
export type ChannelItem = {
  id: null
  name: string
}

type ChannelRes = {
  channels: ChannelItem[]
}

// 请求频道列表
export function fetchChannelListAPI() {
  return http.request<ResType<ChannelRes>>({
    url: '/channels',
  })
}

type ArticleItem = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: number
    images: string[]
  }
}

export type ArticleListRes = {
  results: ArticleItem[]
  pre_timestamp: string
}

type ArticleListReqParams = {
  channel_id: string
  timestamp: string
}

// 请求文章列表
export function fetchArticleListAPI(params: ArticleListReqParams) {
  return http.request<ResType<ArticleListRes>>({
    url: '/articles',
    params,
  })
}
