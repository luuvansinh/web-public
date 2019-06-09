import { ApiConst } from '../../configs';
import { request } from '../../utils';

export const order = (data) => {
  const api = ApiConst.order.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export const payment = (data) => {
  const api = ApiConst.payment.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}
