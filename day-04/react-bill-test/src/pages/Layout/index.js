import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <Outlet />
      我是 Layout
    </div>
  )
}

export default Layout