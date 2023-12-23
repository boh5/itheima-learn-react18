import './index.css'

import {createContext, useContext, useEffect, useRef, useState} from 'react'


function Son(props) {
  // props 是一个对象。包含了父组件传过来的所有数据
  console.log(props)

  // 子组件只能读取 props，不能修改
  // props.name = 'rose'

  // 特殊的 prop：children

  return <div>this is son. {props.name}. jsx: {props.child}. children: {props.children}</div>
}

function Son2({onGetSonMsg}) {
  const sonMsg = 'this is son2 msg'
  return (
    <div>
      this is Son2
      <button onClick={() => onGetSonMsg(sonMsg)}>sendMsg</button>
    </div>
  )
}

// 1. 子传父 A -> App
// 2. 父传子 App -> B

function A({onGetAName}) {
  const name = 'this is A name'
  return (
    <div>
      this is A component,
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  )
}

function B({name}) {
  return (
    <div>
      this is B component,
      {name}
    </div>
  )
}

// 使用 context 跨层传递数据
// App -> A -> B
// 1. 使用 createContext 创建 context 对象
const MsgContext = createContext()

// 2. 在顶层组件通过 Provider 组件提供数据

// 3. 在底层组件通过 userContext 钩子函数使用数据

function A2() {
  return (
    <div>
      this is A2 component
      <B2 />
    </div>
  )
}

function B2() {
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B2 component, {msg}
    </div>
  )
}

// useEffect 基础使用
const URL = 'https://geek.itheima.net/v1_0/channels'

function Son3() {
  // 1. 渲染时开启一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中')
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div>this is son3</div>
}

// 自定义 hook
// 思路：
// 1. 声明以 use 打头的函数
// 2. 在函数体内封装可复用的逻辑
// 3. 把组件中用到的状态或者回调 return 出去
// 4. 在组件中执行自定义 hook，获取 return 的状态和回调进行使用
function useToggle() {
  // 可复用的逻辑代码
  const [value, setValue] = useState(true)
  const toggle = () => setValue(!value)

  // 哪些状态和回调函数需要在其他组件中使用就 return
  return {
    value,
    toggle
  }
}

// ReactHooks 使用规则
// 1. 只能在组件中或其他自定义 hook 函数中使用
// const[show, setShow] = useState(true)  // 错误：组件外使用
// 2. 只能在组件的顶层调用，不能嵌套在 if, for 或其他函数中

function App() {
  // if (Math.random() > 0.5) {
  //   const [show, setShow] = useState(true)  // 错误：if 中使用
  // }

  const [inputValue, setInputValue] = useState('')

  // 获取 DOM
  // 1. 使用 useRef 创建一个 ref 对象
  const inputRef = useRef(null);
  // 2. DOM 可用时， ref.current 获取 DOM
  // 渲染完毕后 DOM 生成后才可用
  const showDom = () => {
    console.dir(inputRef.current)
  }

  const name = 'this is app name'

  // 子传父
  const [msg, setMsg] = useState('')
  const getMsg = (msg) => {
    console.log(msg)
    setMsg(msg)
  }

  const [aName, setAName] = useState('')
  const getAName = (name) => {
    console.log(name)
    setAName(name)
  }

  const msg2 = 'this is app msg2'

  // useEffect 基础使用
  // 创建一个状态
  const [list, setList] = useState([])
  useEffect(() => {
    // 获取频道列表
    async function getList() {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes)
      setList(jsonRes.data.channels)
    }

    getList()
  }, [])

  // 1. 没有依赖项，执行时机：初始 + 组件更新
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log('副作用函数执行了')
  // })

  // 2. 传入空数组依赖，执行时机：初始
  // useEffect(() => {
  //   console.log('副作用函数执行了')
  // }, [])

  // 3. 传入特定依赖项，执行时机：初始 + 依赖项变化
  useEffect(() => {
    console.log('副作用函数执行了')
  }, [count])

  // 通过条件渲染模拟组件卸载
  const [show, setShow] = useState(true)

  // 封装自定义 hook
  // 存在问题：bool 切换逻辑和当前组件耦合在一起，不能复用
  // const [value, setValue] = useState(true)
  // const toggle = () => setValue(!value)
  // 解决思路：自定义篇 hook
  const {value, toggle} = useToggle()

  return (
    <div className="App">
      {/*表单受控绑定*/}
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
      </div>

      {/*获取 DOM*/}
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={showDom}>获取 DOM</button>
      </div>

      {/*组件通信*/}
      {/*父传子*/}
      <div>
        <Son
          name={name}
          age={18}
          isTrue={false}
          list={['vue', 'react']}
          obj={{name: 'jack'}}
          cb={() => console.log(123)}
          child={<span>this is span</span>}
        />
        <Son><span>props.children</span></Son>
      </div>

      {/*子传父*/}
      <div>
        this is app, msg: {msg}
        <Son2 onGetSonMsg={getMsg} />
      </div>

      {/*状态提升实现兄弟组件的通信*/}
      <div>
        this is App
        <A onGetAName={getAName} />
        <B name={aName} />
      </div>

      {/*使用 context 跨层传递数据*/}
      <div>
        < MsgContext.Provider value={msg2}>
          this is App
          <A2 />
        </MsgContext.Provider>
      </div>

      {/*useEffect 基础使用*/}
      <div>
        <br />
        this is App
        <ul>
          {list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>

      {/*useEffect 不同依赖项说明*/}
      <div>
        this is App <button onClick={() => setCount(count + 1)}>+{count}</button>
      </div>

      {/*useEffect 清除副作用*/}
      <div>
        {show && <Son3 />}
        <button onClick={() => setShow(false)}>卸载 son3 组件</button>
      </div>

      {/*封装自定义hook*/}
      <div>
        {value && <div>封装自定义 hook</div>}
        <button onClick={toggle}>toggle</button>
      </div>
    </div>
  )
}

export default App
