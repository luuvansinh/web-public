import queryString from 'query-string'
import { getProducts } from '../home/service';

export default {
  namespace: 'search',
  state: {
    products: [],
    filter: {},
  },
  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(getProducts, payload)
      const { products, total, limit, endData } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          products,
          filter: {
            ...payload,
            total,
            limit,
            endData,
          },
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
    updateFilter(state, { payload }) {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...payload,
        },
      }
    },
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateFilter',
          payload: queryString.parse(location.search),
        })
      })
    },
    setup({ dispatch }) {
      dispatch({ type: 'init' })
    },
  },
}
