import { update, getOrders, cancelOrder, showOrder, rate } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'profile',
  state: {
    orders: [],
    filter: {
      page: 0,
      total: 0,
      limit: 0,
    },
    order: null,
  },
  effects: {
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload)
      const { error } = response
      if (error) {
        return notification.error(error)
      }
      yield put({
        type: 'app/init',
      })
    },
    *fetchOrders({ payload }, { call, put }) {
      const response = yield call(getOrders, payload)
      const { orders, total, limit } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          orders,
          filter: {
            ...payload,
            total,
            limit,
          },
        },
      })
    },
    *cancelOrder({ orderId }, { call, put, select }) {
      const response = yield call(cancelOrder, orderId)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      const { filter } = yield select(state => state.profile)
      yield put({
        type: 'fetchOrders',
        payload: filter,
      })
    },
    *showOrder({ orderId }, { call, put }) {
      const response = yield call(showOrder, orderId)
      const { result } = response
      yield put({
        type: 'updateState',
        payload: {
          order: result,
        },
      })
    },
    *rate({ payload }, { call }) {
      const response = yield call(rate, payload)
      const { success, error } = response
      if (!success || error) {
        return notification.error(error || 'Lỗi hệ thống')
      }
      notification.success('Đánh giá sản phẩm thành công')
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
