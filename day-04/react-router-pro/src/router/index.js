import Login from "../page/Login"
import Article from "../page/Article"
import {createBrowserRouter} from "react-router-dom"
import Layout from "../page/Layout"
import Board from "../page/Board"
import About from "../page/About"
import NotFound from "../page/NotFound"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Board />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/article/:id/:name',
    element: <Article />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router