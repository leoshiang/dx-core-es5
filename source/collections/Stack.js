/* global Dolphin */
Dolphin.StackUnderflowException = Dolphin.ExceptionFactory(
  'StackUnderflowException')

Dolphin.Stack = function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var items = []

  function clear () {
    items.length = 0
  }

  function peek () {
    if (items.length === 0) {
      throw new Dolphin.StackUnderflowException()
    }

    return items[items.length - 1]
  }

  function push (item) {
    items.push(item)

    return this
  }

  function pop () {
    if (items.length === 0) {
      throw new Dolphin.StackUnderflowException()
    }

    return items.pop()
  }

  function getCount () {
    return items.length
  }

  // ---- export ------------------------------------------
  var exports = {
    clear: clear,
    peek: peek,
    pop: pop,
    push: push
  }

  Type.defineProperty(exports, 'count', getCount)

  return exports
}
