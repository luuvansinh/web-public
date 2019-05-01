import { ApiConst } from '../../configs';
import { request } from '../../utils';

const getCategory = (_id) => {
  const api = ApiConst.public.category.show(_id)
  return request.call(api.url)
}

export {
  getCategory,
}
