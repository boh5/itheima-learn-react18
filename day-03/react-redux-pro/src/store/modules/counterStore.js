import {createSlice} from "@reduxjs/toolkit"

const counterStore = createSlice({
  name: 'counter',
  // 初始化 state
  initialState: {
    count: 0
  },
  // 修改状态的方法，同步方法。
  // 支持直接修改
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addToNum(state, action) {
      state.count = action.payload
    },
  }
})

// 结构出 actionCreator 函数
const {increment, decrement, addToNum} = counterStore.actions

// 获取 reducer
const reducer = counterStore.reducer


// 按需导出 actionCreator
export {increment, decrement,addToNum}

// 默认导出 reducer
export default reducer