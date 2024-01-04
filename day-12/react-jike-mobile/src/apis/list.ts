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