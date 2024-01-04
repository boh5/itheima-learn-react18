import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {fetchChannelListAPI} from '@/apis/list.ts'

// 测试接口
fetchChannelListAPI().then(res => {
  console.log(res.data.data.channels)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
