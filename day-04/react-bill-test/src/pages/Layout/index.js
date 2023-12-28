import {Outlet, useNavigate} from "react-router-dom"
import {TabBar} from "antd-mobile"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {getBillList} from "@/store/modules/billStore"
import './index.scss'
import {AddCircleOutline, BillOutline, CalculatorOutline} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />
  }
]

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  // 路由跳转
  const navigate = useNavigate()
  const switchRoute = (path) => {
    navigate(path)
  }

  return (
    <div className='layout'>
      <div className='container'>
        <Outlet />
      </div>
      <div className='footer'>
        <TabBar onChange={switchRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout