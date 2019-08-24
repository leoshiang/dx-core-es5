/* global Dolphin */
Dolphin.Map = function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var items = {}

  function clear () {
    items = {}
  }

  function forEach (callback) {
    Object.keys(items).forEach(function (key) {
      callback(items[key], key)
    })
  }

  function get (key) {
    return items[key]
  }

  function has (key) {
    return items.hasOwnProperty(key)
  }

  function iteratorToArray (iterator) {
    var item
    var result = []
    while (!(item = iterator.next()).done) {
      result.push(item.value)
    }

    return result
  }

  function keys () {
    return Type.iterator(Object.keys(items))
  }

  function keysToArray () {
    return iteratorToArray(keys())
  }

  function remove (key) {
    delete items[key]
  }

  function set (key, value) {
    items[key] = value

    return this
  }

  function valuesToArray () {
    return iteratorToArray(values())
  }

  function values () {
    return Type.iterator(Object.keys(items).map(function (item) {
      return items[item]
    }))
  }

  function getSize () {
    return Object.keys(items).length
  }

  // ---- export ------------------------------------------
  var exports = {
    clear: clear,
    forEach: forEach,
    get: get,
    has: has,
    iteratorToArray: iteratorToArray,
    keys: keys,
    keysToArray: keysToArray,
    remove: remove,
    set: set,
    values: values,
    valuesToArray: valuesToArray
  }

  Type.defineProperty(exports, 'size', getSize)

  return exports
}
