import {create} from "zustand"
import {createCounterStore} from "./counterStore"
import {createChannelStore} from "./channelStore"

export const useStore3 = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a)
  }
})