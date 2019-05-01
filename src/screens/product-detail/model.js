import { fetch, comment, rate } from './service'
import { notification } from '../../utils';

export default {
  namespace: 'product',

  state: {
    product: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch, payload.id)
      const { product } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          product,
        },
      })
    },
    *comment({ payload }, { call, put, select }) {
      const { product: { id } } = yield select(state => state.product)
      const response = yield call(comment, {
        ...payload,
        product_id: id,
      })
      const { error } = response
      if (error) {
        return notification.error(error)
      }
      yield put({
        type: 'fetch',
        payload: {
          id,
        },
      })
    },
    *rate({ payload }, { call, put, select }) {
      const response = yield call(rate, payload)
      const { error } = response
      if (error) {
        return notification.error(error)
      }
      const { product: { id } } = yield select(state => state.product)
      yield put({
        type: 'fetch',
        payload: {
          id,
        },
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
