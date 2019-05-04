import { order } from './service'
import { notification } from '../../utils';

export default {
  namespace: 'checkout',
  state: {},
  effects: {
    *order({ payload }, { call, put }) {
      const response = yield call(order, payload)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      yield put({
        type: 'app/getCart',
      })
    },
  },
  reducers: {},
}
