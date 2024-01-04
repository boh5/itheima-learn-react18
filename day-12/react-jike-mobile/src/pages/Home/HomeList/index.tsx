import {Image, List} from 'antd-mobile'
import {useEffect, useState} from 'react'
import {ArticleListRes, fetchArticleListAPI} from '@/apis/list.ts'

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

  return (
    <List>
      {articleRes.results.map((item) => (
        <List.Item
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
  )
}

export default HomeList