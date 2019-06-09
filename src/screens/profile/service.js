import { ApiConst } from '../../configs'
import { request } from '../../utils'

const update = (data) => {
  const api = ApiConst.me.update()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const getOrders = (query) => {
  const api = ApiConst.order.all()
  return request.call(api.url, {
    method: api.method,
    body: query,
  })
}

const cancelOrder = (id) => {
  const api = ApiConst.order.cancel(id)
  return request.call(api.url, {
    method: api.method,
  })
}

const showOrder = (id) => {
  const api = ApiConst.order.show(id)
  return request.call(api.url, {
    method: api.method,
  })
}

const rate = (data) => {
  const api = ApiConst.rating.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  update,
  getOrders,
  cancelOrder,
  showOrder,
  rate,
}
