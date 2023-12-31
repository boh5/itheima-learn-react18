import {useEffect, useState} from "react"
import {getChannelListAPI} from "@/apis/article"

export function useChannelList() {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    // 1. 封装函数
    const getChannelList = async () => {
      const res = await getChannelListAPI()
      setChannelList(res.data.channels)
    }
    // 2. 调用函数
    getChannelList()
  }, [])

  return {
    channelList
  }
}
