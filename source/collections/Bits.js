/* global Dolphin, Polyfill */
Dolphin.Bits = function (length) {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var bitsPerPage = 32
  var bitCount = 0
  var pages = []

  function fromInt32 (value) {
    bitCount = bitsPerPage
    pages[0] = value | 0

    return this
  }

  function forEach (callback) {
    if (!Type.isFunction(callback)) {
      return this
    }

    var i
    for (i = 0; i < bitCount; i += 1) {
      callback(i, isOn(i))
    }

    return this
  }

  function getLength () {
    return bitCount
  }

  function getPageIndex (bitNumber) {
    return Math.floor(bitNumber / bitsPerPage)
  }

  function getNumberOfPages (bits) {
    return Math.floor((bits + bitsPerPage - 1) / bitsPerPage)
  }

  function isOn (index) {
    var page = pages[getPageIndex(index)]
    return (page & (1 << index % bitsPerPage)) !== 0
  }

  function on (bitIndex) {
    Dolphin.Assert.ensureIndex(0, bitCount - 1, bitIndex)
    pages[getPageIndex(bitIndex)] |= 1 << bitIndex % bitsPerPage
    return this
  }

  function off (bitIndex) {
    Dolphin.Assert.ensureIndex(0, bitCount - 1, bitIndex)
    pages[getPageIndex(bitIndex)] &= ~(1 << bitIndex % bitsPerPage)
    return this
  }

  function setLength (newLength) {
    if (!Type.isNumber(newLength)) {
      return
    }

    var pagesNeeded = getNumberOfPages(bitCount)
    var differences = pagesNeeded - pages.length
    if (differences > 0) {
      pages.concat(Polyfill.fill.call(new Array(differences), 0))
    } else {
      pages.length = pagesNeeded
    }

    bitCount = newLength
  }

  function set (bitIndex, value) {
    if (value) {
      on(bitIndex)
    } else {
      off(bitIndex)
    }

    return this
  }

  function toInt32 () {
    return pages.length === 0 ? 0 : pages[0] | 0
  }

  // ---- export ------------------------------------------
  var exports = {
    forEach: forEach,
    fromInt32: fromInt32,
    getNumberOfPages: getNumberOfPages,
    getPageIndex: getPageIndex,
    isOn: isOn,
    off: off,
    on: on,
    set: set,
    toInt32: toInt32
  }

  Type.defineProperty(exports, 'length', getLength, setLength)
  setLength(length || 0)

  return exports
}
