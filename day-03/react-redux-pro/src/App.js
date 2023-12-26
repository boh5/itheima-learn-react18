import {useDispatch, useSelector} from "react-redux"
import {increment, decrement, addToNum} from "./store/modules/counterStore"
import {fetchChannelList} from "./store/modules/channelStore"
import {useEffect} from "react"

function App() {
  const {count} = useSelector(state => state.counter)
  const {channelList} = useSelector(state => state.channel)
  const dispatch = useDispatch()

  // 使用 useEffect 出发异步请求执行
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add to 20</button>

      <ul>
        {channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
