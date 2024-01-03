export const createCounterStore = (set) => {
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