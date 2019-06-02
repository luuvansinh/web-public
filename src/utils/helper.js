/* eslint-disable guard-for-in */
import lodash from 'lodash'

/**
 * Check array contains path or not
 *
 * @param {Array}   array array of url
 * @param {String}  path url
 */
const checkPathPermission = (array, path) => {
  for (const item of array) {
    if (item.value.test(path)) {
      return true
    }
  }
  return false
}

/**
 * Merge 2 objects
 *
 * @param {Object} obj1
 * @param {Object} obj2
 */
const mergeObjects = (obj1, obj2) => {
  return lodash.merge(obj1, obj2)
}

const calculateTotal = (cart = []) => {
  return cart.length ? cart.map(item => item.quantity * item.currentPrice)
    .reduce((previous, current) => previous + current) : 0
}

export default {
  checkPathPermission,
  mergeObjects,
  calculateTotal,
}
