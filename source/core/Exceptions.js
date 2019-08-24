/* global Dolphin */
Dolphin.ExceptionFactory = function (name) {
  function result (message) {
    this.message = message || 'ExceptionFactory: Error'
    this.name = name || 'ExceptionFactory'
    this.stack = new Error().stack
  }

  result.prototype = Object.create(Error.prototype)
  result.constructor = result

  return result
}

Dolphin.AssertException = new Dolphin.ExceptionFactory('AssertException')
Dolphin.ArgumentException = new Dolphin.ExceptionFactory('ArgumentException')
Dolphin.NullException = new Dolphin.ExceptionFactory('NullException')
Dolphin.IndexException = new Dolphin.ExceptionFactory('IndexException')
Dolphin.NamespaceException = new Dolphin.ExceptionFactory('NamespaceException')
