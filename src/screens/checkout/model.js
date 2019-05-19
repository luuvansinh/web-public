import { order } from './service'
import { notification } from '../../utils';

export default {
  namespace: 'checkout',
  state: {
    isOrderSuccess: false,
  },
  effects: {
    *order({ payload }, { call, put }) {
      const response = yield call(order, payload)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      yield put({
        type: 'app/getCart',
      })
      yield put({
        type: 'updateState',
        payload: { isOrderSuccess: true },
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
