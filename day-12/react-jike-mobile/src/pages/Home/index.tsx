import './style.css'
import {Tabs} from 'antd-mobile'
import {useEffect, useState} from 'react'
import {ChannelItem, fetchChannelListAPI} from '@/apis/list.ts'


const Home = () => {
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

  return (
    <div className="tabContainer">
      {/* tab 区域 */}
      <Tabs>
        {channels.map(item => (
          <Tabs.Tab title={item.name} key={item.id}>
            {/* list 组件 */}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default Home
