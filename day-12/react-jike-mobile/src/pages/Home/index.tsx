import './style.css'
import {Tabs} from 'antd-mobile'
import {useTabs} from '@/pages/Home/useTabs.ts'


const Home = () => {
  const {channels} = useTabs()

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
