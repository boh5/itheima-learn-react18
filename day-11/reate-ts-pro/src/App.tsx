import React, {useEffect, useRef, useState} from "react";

// 根据初始值自动推断
// 场景：明确的初始值

type User = {
  name: string
  age: number
}

// props 注解
// type Props = {
//   className: string
// }
interface Props {
  className: string
}

function Button(props: Props) {
  const {className} = props
  return <button className={className}>Click me</button>
}

// props & typescript - 为 children 添加类型
type Props2 = {
  className: string
  children: React.ReactNode
}

function Button2(props: Props2) {
  const {className, children} = props
  return <button className={className}>{children}</button>
}

// props & typescript - 为事件 prop 添加类型
type Props3 = {
  onGetMsg?: (msg: string) => void
}

function Son(props: Props3) {
  const {onGetMsg} = props
  const clickHandler = () => {
    onGetMsg?.('this is msg')
  }
  return <button onClick={clickHandler}>sendMsg</button>
}

function App() {
  const [value, setValue] = useState(false)

  const [list, setList] = useState([1, 2, 3])
  const changeValue = () => {
    setValue(true)
  }

  const changeList = () => {
    setList([4, 5, 6])
  }

  // 限制初始值的类型
  // const [user, setUser] = useState<User>({
  //   name: 'jack',
  //   age: 18
  // })

  // const [user, setUser] = useState<User>(() => {
  //   return {
  //     name: 'jack',
  //     age: 18
  //   }
  // })

  const [user, setUser] = useState<User>({
    name: 'jack',
    age: 18
  })

  // const changeUser = () => {
  //   setUser({
  //     name: 'john',
  //     age: 28
  //   })
  // }
  const changeUser = () => {
    setUser(() => ({
      name: 'john',
      age: 28
    }))
  }

  const [user2, setUser2] = useState<User | null>(null)

  const changeUser2 = () => {
    setUser2(null)
    setUser2({
      name: 'jack',
      age: 18
    })
  }

  // useRef & typescript
  const domRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    domRef.current?.focus()
  }, [])


  return (
    <>
      this is App{value}{list}
      <button onClick={changeValue}>1</button>
      <button onClick={changeList}>2</button>
      <br />

      <button onClick={changeUser}>3</button>
      {user.name}
      <br />

      {/* 为了类型安全， 可选链做类型守卫 */}
      {/* 只有 user 不为 null 时，才做点运算*/}
      {user2?.age}
      <button onClick={changeUser2}>4</button>
      <br />

      <Button className="test"/>
      <br />

      <Button2 className="test">children</Button2>
      <Button2 className="test">
        <span>this is span</span>
      </Button2>
      <br />

      <Son onGetMsg={(msg) => console.log(msg)} />
      <br />

      <input type="text" ref={domRef}/>
      <br />
    </>
  )
}

export default App
