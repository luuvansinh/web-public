import { getCategory } from './service';

export default {
  namespace: 'category',
  state: {
    category: null,
    nextPage: 0,
  },
  effects: {
    *fetch({ categoryId }, { call, put }) {
      const response = yield call(getCategory, categoryId)
      const { category } = response.data.data
      yield put({
        type: 'updateState',
        payload: { category },
      })
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
