import { ApiConst } from '../../configs';
import { request } from '../../utils';

export const order = (data) => {
  const api = ApiConst.order.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}
