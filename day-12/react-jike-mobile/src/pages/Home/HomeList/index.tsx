import {Image, InfiniteScroll, List} from 'antd-mobile'
import {useEffect, useState} from 'react'
import {ArticleListRes, fetchArticleListAPI} from '@/apis/list.ts'
import {useNavigate} from 'react-router-dom'

type Props = {
  channelId: string
}

const HomeList = (props: Props) => {
  const {channelId} = props
  const [articleRes, setArticleRes] = useState<ArticleListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),
  })

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchArticleListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime(),
        })
        setArticleRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp,
        })
      } catch (error) {
        throw new Error('fetchArticleListAPI error')
      }
    }
    getList()
  }, [channelId])

  // 开关，标记是否还有新数据
  const [hasMore, setHasMore] = useState(true)

  // 加载下一页的函数
  const loadMore = async () => {
    console.log('上拉加载出发了')
    try {
      const res = await fetchArticleListAPI({
        channel_id: channelId,
        timestamp: articleRes.pre_timestamp,
      })
      // 拼接心数据 + 存下一次请求的时间戳
      setArticleRes({
        results: [...articleRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp,
      })
      // 停止监听
      if (res.data.data.results.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      throw new Error('fetchArticleListAPI error')
    }
  }

  // 路由跳转
  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }

  return (
    <>
      <List>
        {articleRes.results.map((item) => (
          <List.Item
            onClick={() => goToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{borderRadius: 20}}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10}/>
    </>
  )
}

export default HomeList