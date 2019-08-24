var Polyfill = {}

Polyfill.fill = (function () {
  if (Array.fill) {
    return Array.fill
  }

  return function (value) {
    if (this == null) {
      throw new TypeError('this is null or not defined')
    }

    var obj = Object(this)
    var len = obj.length >>> 0
    var start = arguments[1]
    var relativeStart = start >> 0
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(
      relativeStart, len)
    var end = arguments[2]
    var relativeEnd = end === undefined ? len : end >> 0
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(
      relativeEnd, len)
    while (k < final) {
      obj[k] = value
      k++
    }

    return obj
  }
})()
