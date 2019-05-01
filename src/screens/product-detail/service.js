import { ApiConst } from '../../configs'
import { request } from '../../utils'

const fetch = (productId) => {
  const api = ApiConst.public.products.show(productId)
  return request.call(api.url)
}

const comment = (data) => {
  const api = ApiConst.comment.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
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
  fetch,
  comment,
  rate,
}
