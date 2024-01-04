import {useEffect, useState} from 'react'
import {DetailDataType, fetchArticleDetailAPI} from '@/apis/detail.ts'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null)

  const [params] = useSearchParams()
  const id = params.get('id')
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchArticleDetailAPI(id!)
        setDetail(res.data.data)
      } catch (error) {
        throw new Error('fetchArticleDetailAPI error')
      }
    }
    getDetail()

  }, [])

  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }

  // 数据返回前 loading
  if (!detail) {
    return <div>this is loading</div>
  }

  return (
    <div>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div dangerouslySetInnerHTML={{
        __html: detail?.content,
      }}></div>
    </div>
  )
}

export default Detail
