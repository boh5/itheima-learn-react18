import {useEffect, useState} from 'react'
import {ChannelItem, fetchChannelListAPI} from '@/apis/list.ts'

function useTabs() {
  const [channels, setChannels] = useState<ChannelItem[]>([])
  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelListAPI()
        setChannels(res.data.data.channels)
      } catch (error) {
        throw new Error('fetchChannelListAPI error')
      }
    }
    getChannels()
  }, [])

  return {
    channels
  }
}

export {useTabs}