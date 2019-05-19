import { getProducts } from './service';

export default {

  namespace: 'home',

  state: {
    products: [],
    filters: {
      page: 0,
      keyword: '',
      endData: false,
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    *products({ payload }, { put, call }) {
      const response = yield call(getProducts, payload)
      const { products, total, limit, endData } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          products,
          filters: {
            ...payload,
            limit,
            total,
            endData,
          },
        },
      })
    },
    *loadmore({ }, { put, select, call }) {
      const { filters: { page }, products } = yield select(_ => _.home)
      const response = yield call(getProducts, { page: page + 1 })
      const { products: newData, endData } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          products: [...products, ...newData],
          filters: {
            page: page + 1,
            endData,
          },
        },
      })
    },
  },
}
