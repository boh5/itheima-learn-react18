import {request} from "@/utils"

export function getChannelListAPI() {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data: data
  })
}

export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}
