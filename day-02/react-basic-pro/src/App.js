import './App.scss';
import avatar from './images/bozai.png'
import {useEffect, useRef, useState} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
import dayjs from 'dayjs'
import axios from "axios"

// 评论列表数据
const list = [
  {
    "rpid": 3,
    "user": {
      "uid": "13258165",
      "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
      "uname": "周杰伦"
    },
    "content": "哎哟，不错哦",
    "ctime": "10-18 08: 15",
    "like": 126
  },
  {
    "rpid": 2,
    "user": {
      "uid": "36080105",
      "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
      "uname": "许嵩"
    },
    "content": "我寻你千百度 日出到迟暮",
    "ctime": "11-13 11: 29",
    "like": 88
  },
  {
    "rpid": 1,
    "user": {
      "uid": "30009257",
      "avatar": avatar,
      "uname": "黑马前端"
    },
    "content": "学前端就来黑马",
    "ctime": "10-19 09: 00",
    "like": 66
  }
]

// 当前登录用户信息
const user = {
  uid: '30009257',
  avatar,
  uname: 'bo'
}

// 导航 Tab 数组
const tabs = [
  {type: 'hot', text: '最热'},
  {type: 'time', text: '最新'}
]

// 自定义 hook 封装数据请求
function useGetList() {
  // 获取接口数据
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    async function getList() {
      const res = await axios.get('http://localhost:3001/list')
      setCommentList(res.data)
    }

    getList()
  }, [])

  return {
    commentList,
    setCommentList
  }
}

// 封装评论 Item 组件
function Item({item, onDel}) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            alt=""
            src={item.user.avatar}
          />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {/* 条件：user.id === item.user.id */}
            {user.uid === item.user.uid &&
              <span className='delete-btn' onClick={() => onDel(item.rpid)}>
                      删除
                    </span>}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  // 渲染评论列表
  // 1. 使用 useState 维护 list
  // const [commentList, setCommentList] = useState(_.orderBy(list, 'like', 'desc'))

  const {commentList, setCommentList} = useGetList()

  // 删除功能
  const handleDel = (id) => {
    // 对 commentList 做过滤处理
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  // tab 切换功能
  // 1. 点击谁就把谁的 type 记录下来
  // 2. 通过记录的 type 和每一项遍历时的 type 做匹配，控制激活类名的显示
  const [type, setType] = useState('hot')
  const handleTabChange = (type) => {
    setType(type)
    // 基于列表的排序
    if (type === 'hot') {
      // 根据点赞数排序
      setCommentList(_.orderBy(commentList, 'like', 'desc'))
    } else {
      // 根据创建时间排序
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
    }
  }

  // 发表评论
  const [content, setContent] = useState('')
  const inputRef = useRef(null);
  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        "rpid": uuidV4(),
        "user": user,
        "content": content,
        "ctime": dayjs().format('MM-DD HH:mm'),
        "like": 66
      }
    ])
    // 1. 清空输入框内容
    setContent('')
    // 2. 重新聚焦
    inputRef.current.focus()
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => (
              <span
                key={item.type}
                className={classNames('nav-item', {active: type === item.type})}
                onClick={() => handleTabChange(item.type)}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              ref={inputRef}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map(item => (
            <Item key={item.rpid} item={item} onDel={handleDel} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default App
