import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: [],
    // 菜单激活下标值
    activeIndex: 0,
    // 购物车列表
    cartList: []
  },
  reducers: {
    // 更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload
    },
    // 更改 activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    // 添加购物车
    addCart(state, action) {
      // 是否添加过? 以 action.payload.id 取 cartList 中匹配
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        state.cartList.push(action.payload)
      }
    },
    // count 增
    incrCount(state, action) {
      // 找到要修改谁的 count: id
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count++
    },
    // count 减
    descCount(state, action) {
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item.count > 0) {
        item.count--
      }
    },
    // 清除购物车
    clearCart(state) {
      state.cartList = []
    },
  }
})

const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  incrCount,
  descCount,
  clearCart,
} = foodsStore.actions

const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(setFoodsList(res.data))
  }
}

export {fetchFoodsList, changeActiveIndex, addCart, incrCount, descCount, clearCart}

const reducer = foodsStore.reducer
export default reducer