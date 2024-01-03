import './App.css';
import {create} from "zustand"
import {useEffect} from "react"
import {useStore3} from "./store"

const URL = 'http://geek.itheima.net/v1_0/channels'


// 1. 拆分子模块，再组合起来
const createCounterStore = (set) => {
  return {
    count: 0,
    inc: () => {
      set((state) => ({
        count: state.count + 1
      }))
    },
    set100: () => {
      set({count: 100})
    }
  }
}

const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes)
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
}

const useStore2 = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a)
  }
})


// 1. 创建 store
const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    // set 两种语法：
    // 1. 用旧数据：参数是函数 （state) => ...
    // 2. 不用旧数据：参数是对象
    inc: () => {
      set((state) => ({
        count: state.count + 1
      }))
    },
    set100: () => {
      set({count: 100})
    },
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes)
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
})

// 2. 绑定 store 到组件
// useStore => {count, inc, set100}

function App() {
  // const {count, inc, set100, channelList, fetchGetList} = useStore()

  // 切片模式
  // const {count, inc, set100, channelList, fetchGetList} = useStore2()

  // 拆分模块
  const {count, inc, set100, channelList, fetchGetList} = useStore3()


  useEffect(() => {
    fetchGetList()
  }, [fetchGetList]);

  return (
    <div className="App">
      this is App
      <button onClick={inc}>{count}</button>
      <button onClick={set100}>set 100</button>
      <ul>{
        channelList.map(item => <li key={item.id}>{item.name}</li>)
      }</ul>
    </div>
  );
}

export default App;
