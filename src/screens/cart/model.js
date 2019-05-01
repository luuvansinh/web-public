
export default {
  namespace: 'cart',
  state: {},
  effects: {},
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
