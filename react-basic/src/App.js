// 项目根组件
// App -> index.js -> public/index.html(root)

// 导入样式
import './index.css'

import {useState} from 'react'

const count = 100
const list = [
  {id: 1001, name: 'Vue'},
  {id: 1002, name: 'React'},
  {id: 1003, name: 'Angular'}
]
const isLogin = true
const articleType = 1  // 0, 1, 3

function getName() {
  return 'jack'
}

function getArticleTem() {
  if (articleType === 0) {
    return <div>我是无图文章</div>
  } else if (articleType === 1) {
    return <div>我是单图模式</div>
  } else {
    return <div>我是三图模式</div>
  }
}

const Button = () => {
  return <button>Button 组件</button>
}

function App() {
  const handleClick = (e, name) => {
    console.log('button 被点击了', e, name)
  }

  const [count1, setCount1] = useState(0)
  const handleCountClick = () => {
    // 作用：
    //    1. 修改 count 值
    //    2. 使用新的 count 渲染 UI
    setCount1(count1 + 1)
  }

  const [form, setForm] = useState({name: 'jack'})

  const changeForm = () => {
    // 错误写法：直接修改
    // form.name = 'rose'
    // 正确写法：用 setForm 传入一个全新的对象
    setForm({
      ...form,
      name: 'rose'
    })
  }

  const spanStyle = {
    color: 'red',
    fontSize: '30px'
  }

  return (
    <div className="App">
      this is App
      {/*使用引号传递字符串*/}
      {'this is message'}

      {/*使用 js 变量*/}
      {count}

      {/*函数调用*/}
      {getName()}

      {/*方法调用*/}
      {new Date().getDate()}

      {/*使用 js 对象*/}
      <div style={{color: 'red'}}>this is div</div>

      {/*渲染列表*/}
      <div>
        <ul>
          {list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>

      {/*条件渲染*/}
      <div>
        {/*逻辑与 &&*/}
        {isLogin && <span>this is span</span>}

        {/*三元运算*/}
        {isLogin ? <span>jack</span> : <div>loading</div>}

        {/*复杂条件渲染*/}
        {getArticleTem()}
      </div>

      {/*事件绑定*/}
      <div>
        <button onClick={(e) => handleClick(e, 'jack')}>点击</button>
      </div>

      {/*使用组件*/}
      <Button />

      {/*useState*/}
      <div>
        <button onClick={handleCountClick}>{count1}</button>
        <button onClick={changeForm}>{form.name}</button>
      </div>

      {/*基础样式控制*/}
      <div>
        {/*行内样式控制*/}
        <span style={{color: 'red', fontSize: '50px'}}>this is span</span>
        <span style={spanStyle}>this is span</span>
        {/*通过 class 控制*/}
        <span className='foo'>this is class foo</span>
      </div>
    </div>
  )
}

export default App
