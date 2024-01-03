import './App.css'
import {forwardRef, memo, useCallback, useImperativeHandle, useMemo, useReducer, useRef, useState} from "react"

// 1. 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'SET':
      return action.payload
    default:
      return state
  }
}

// 2. 组件中调用 useReducer(reducer, 0) => [state, dispatch]

// 3. 调用 dispatch

function fib(n) {
  console.log('计算函数执行了')
  if (n < 3) {
    return 1
  }
  return fib(n - 2) + fib(n - 1)
}

function Son() {
  console.log('我是子组件，我重新渲染了')
  return <div>this is Son</div>
}

const MemoSon = memo(function Son() {
  console.log('我是 Memo 子组件，我重新渲染了')
  return <div>this is Son</div>
})

// 简单类型，比较 prop 是否相等
const MemoSon3 = memo(function Son({count3}) {
  console.log('我是 Memo 子组件3，我重新渲染了')
  return <div>this is Son {count3}</div>
})

// 引用类型，比较引用是否相等
// 保证引用稳定，可避免重新渲染：useMemo
const MemoSon4 = memo(function Son({list}) {
  console.log(`我是 Memo 子组件4，我重新渲染了, list: ${list}`)
  return <div>this is Son {list}</div>
})

const Input = memo(function Input({onChange}) {
  console.log('Input 重新渲染了')
  return <input type='text' onChange={(e) => onChange(e.target.value)} />
})

// forwardRef
const Input2 = forwardRef((props, ref) => {
  return <input type='text' ref={ref} />
})

// useImperativeHandle
const Input3 = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  const focusHandler = () => {
    inputRef.current.focus()
  }

  // 暴露函数给父组件调用
  useImperativeHandle(ref, () => {
    return {
      focusHandler
    }
  })
  return <input type="text" ref={inputRef} />
})

function App() {
  const [state, dispatch] = useReducer(reducer, 0)

  const [count1, setCount1] = useState(0)

  const result = useMemo(() => {
    return fib(count1)
  }, [count1]);

  const [count2, setCount2] = useState(0)
  console.log('组件重新渲染了')

  const [count3, setCount3] = useState(0)

  const list = [1, 2, 3]
  const list2 = useMemo(() => {
    return [4, 5, 6]
  }, [])

  const changeHandler = useCallback((value) => console.log(value), [])

  const inputRef = useRef(null);
  const showRef = () => {
    console.log(inputRef)
    inputRef.current.focus()
  }

  // useImperativeHandle
  const inputRef2 = useRef(null)
  const focusHandler = () => {
    console.log(inputRef2.current)
    inputRef2.current.focusHandler()
  }

  return (
    <div className="App">
      this is App
      <button onClick={() => dispatch({type: 'INC'})}>+</button>
      {state}
      <button onClick={() => dispatch({type: 'DEC'})}>-</button>
      <button onClick={() => dispatch({type: 'SET', payload: 100})}>update</button>
      <br />

      <button onClick={() => setCount1(count1 + 1)}>change count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>change count1: {count2}</button>
      {result}
      <br />

      <Son />
      <MemoSon />
      <br />

      <MemoSon3 count3={count3} />
      <button onClick={() => setCount3(count3 + 1)}>change count</button>
      <MemoSon4 list={list} />
      <MemoSon4 list={list2} />
      <br />

      <Input onChange={changeHandler} />
      <br />

      <Input2 ref={inputRef} />
      <button onClick={showRef}>focus</button>
      <br />

      <Input3 ref={inputRef2} />
      <button onClick={focusHandler}>focus</button>
      <br />
    </div>
  )
}

export default App
