function Namespace () {}

Namespace.prototype = {
  constructor: Namespace,

  traverse: function (namespace, callback) {
    if (namespace.trim() === '') {
      return this
    }

    var parts = namespace.split('.')
    var i, part
    for (i = 0; i < parts.length; i += 1) {
      part = parts[i].trim()
      if (part === '') {
        throw new Error('Invalid namespace')
      }
      parts[i] = part
    }

    var node = this
    var invokeCallback = function (name) {
      node = callback(node, name)
    }

    parts.forEach(invokeCallback)

    return node
  },

  namespace: function (namespace) {
    return this.traverse(namespace, function (node, item) {
      node[item] = node[item] || {}
      return node[item]
    })
  },

  reflection: function (namespace) {
    return this.traverse(namespace, function (node, item) {
      return node[item]
    })
  }
}

/* global Namespace */
var Dolphin = new Namespace()

Dolphin.new = function (constructor) {
  var args = Array.prototype.slice.call(arguments)
  args.shift()
  args.unshift(null)
  var instance = new (Function.prototype.bind.apply(constructor, args))()
  instance.__className__ = constructor.name

  return instance
}

Dolphin.newWithArgs = function (constructor, args) {
  var injectedArgs = Array.prototype.slice.call(args)
  injectedArgs.unshift(constructor)

  return Dolphin.new.apply(null, injectedArgs)
}

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

/* global Dolphin */

Dolphin.Types = {
  Array: 'Array',
  Boolean: 'Boolean',
  Date: 'Date',
  Function: 'Function',
  Null: 'Null',
  Number: 'Number',
  Object: 'Object',
  RegExp: 'RegExp',
  String: 'String',
  Undefined: 'Undefined'
}

Dolphin.Type = (function () {
  // ---- import ------------------------------------------
  var types = Dolphin.Types

  // ---- private -----------------------------------------
  function defineProperty (target, name, getter, setter) {
    var descriptor = {
      enumerable: true,
      configurable: false
    }

    if (getter && isFunction(getter)) {
      descriptor.get = getter
    }

    if (setter && isFunction(setter)) {
      descriptor.set = setter
    }

    Object.defineProperty(target, name, descriptor)
  }

  function getType (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }

  function isArray (obj) {
    return getType(obj) === types.Array
  }

  function isBoolean (obj) {
    return getType(obj) === types.Boolean
  }

  function isDate (obj) {
    return getType(obj) === types.Date
  }

  function isFunction (obj) {
    return getType(obj) === types.Function
  }

  function isNull (obj) {
    return getType(obj) === types.Null
  }

  function isNumber (obj) {
    return getType(obj) === types.Number
  }

  function isObject (obj) {
    return getType(obj) === types.Object
  }

  function isRegExp (obj) {
    return getType(obj) === types.RegExp
  }

  function isString (obj) {
    return getType(obj) === types.String
  }

  function isUndefined (obj) {
    return getType(obj) === types.Undefined
  }

  function isNotArray (obj) {
    return getType(obj) !== types.Array
  }

  function isNotBoolean (obj) {
    return getType(obj) !== types.Boolean
  }

  function isNotDate (obj) {
    return getType(obj) !== types.Date
  }

  function isNotFunction (obj) {
    return getType(obj) !== types.Function
  }

  function isNotNull (obj) {
    return getType(obj) !== types.Null
  }

  function isNotNumber (obj) {
    return getType(obj) !== types.Number
  }

  function isNotObject (obj) {
    return getType(obj) !== types.Object
  }

  function isNotRegExp (obj) {
    return getType(obj) !== types.RegExp
  }

  function isNotString (obj) {
    return getType(obj) !== types.String
  }

  function isNotUndefined (obj) {
    return getType(obj) !== types.Undefined
  }

  function isZero (obj) {
    return obj === 0
  }

  function isGreatThanZero (obj) {
    return isNumber(obj) && obj >= 0
  }

  function isSmallThanZero (obj) {
    return isNumber(obj) && obj < 0
  }

  function isNullOrUndefined (obj) {
    return isNull(obj) || isUndefined(obj)
  }

  function isNotNullOrUndefined (obj) {
    return !isNull(obj) && !isUndefined(obj)
  }

  function sameType (obj, other) {
    return getType(obj) === getType(other)
  }

  function deepEqual (obj, other) {
    if (!sameType(obj, other)) {
      return false
    }

    if (isFunction(obj)) {
      return obj.toString() === other.toString()
    }

    if (!(obj instanceof Object) && !(other instanceof Object)) {
      return obj === other
    }

    var keys = Object.keys(obj || {})
    var i
    var key
    for (i = 0; i <= keys.length; i += 1) {
      key = keys[i]
      if (!deepEqual(obj[key], other[key])) {
        return false
      }
    }

    return true
  }

  function merge () {
    var result = {}
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i]
      if (!source) {
        continue
      }
      extend(result, source)
    }

    return result
  }

  function extend (targetObject, sourceObject) {
    function isNestedObject (source, target, property) {
      var isNested = isObject(target[property]) || isArray(target[property])
      return ((isNested || isNullOrUndefined(target[property])) &&
        isObject(source[property]))
    }

    function copyFlatProperty (source, target, property) {
      var descriptor = Object.getOwnPropertyDescriptor(source, property)
      if (descriptor.configurable) {
        Object.defineProperty(target, property, descriptor)
      }
    }

    function copyNestedProperty (source, target, property) {
      if (isUndefined(target[property])) {
        target[property] = isArray(source[property]) ? [] : {}
      }

      if (isNotArray(target[property]) && isArray(source[property])) {
        target[property] = []
      } else if (isArray(target[property]) && isNotArray(source[property])) {
        target[property] = {}
      }

      target[property] = merge(target[property], source[property])
    }

    Object.getOwnPropertyNames(sourceObject).forEach(function (property) {
      var copyProperties = isNestedObject(sourceObject, targetObject, property)
        ? copyNestedProperty
        : copyFlatProperty
      copyProperties(sourceObject, targetObject, property)
    })

    return targetObject
  }

  function inherit (child, parent) {
    child.prototype = Object.create(parent.prototype)
  }

  function mixin (target) {
    var Assert = Dolphin.Assert
    Assert.isTrue(arguments.length >= 2)
    Assert.isFunction(target)
    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i]
      Assert.isFunction(arg)
      arg.call(target.prototype)
    }
  }

  function iterator (obj) {
    var keys = Object.keys(obj)
    var length = keys.length
    var i = 0

    function next () {
      if (i < length) {
        var key = keys[i++]
        return {
          value: obj[key],
          done: false
        }
      } else {
        return {
          value: void 0,
          done: true
        }
      }
    }

    return {
      next: next
    }
  }

  function getSortedKeys (obj) {
    return Object.keys(obj || {}).sort()
  }

  // ---- export ------------------------------------------
  return {
    defineProperty: defineProperty,
    getType: getType,
    isArray: isArray,
    isBoolean: isBoolean,
    isDate: isDate,
    isFunction: isFunction,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString,
    isUndefined: isUndefined,
    isNotArray: isNotArray,
    isNotBoolean: isNotBoolean,
    isNotDate: isNotDate,
    isNotFunction: isNotFunction,
    isNotNull: isNotNull,
    isNotNumber: isNotNumber,
    isNotObject: isNotObject,
    isNotRegExp: isNotRegExp,
    isNotString: isNotString,
    isNotUndefined: isNotUndefined,
    isZero: isZero,
    isGreatThanZero: isGreatThanZero,
    isSmallThanZero: isSmallThanZero,
    isNullOrUndefined: isNullOrUndefined,
    isNotNullOrUndefined: isNotNullOrUndefined,
    sameType: sameType,
    deepEqual: deepEqual,
    merge: merge,
    extend: extend,
    inherit: inherit,
    mixin: mixin,
    iterator: iterator,
    getSortedKeys: getSortedKeys
  }
})()

/* global Dolphin */
Dolphin.Assert = (function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  function throwException (ex, message) {
    var Exception = ex === null || ex === undefined
      ? Dolphin.AssertException
      : ex
    throw new Exception(message || '')
  }

  function isArray (obj, message, exception) {
    if (!Type.isArray(obj)) {
      throwException(exception, message)
    }
  }

  function isBoolean (obj, message, exception) {
    if (!Type.isBoolean(obj)) {
      throwException(exception, message)
    }
  }

  function isDate (obj, message, exception) {
    if (!Type.isDate(obj)) {
      throwException(exception, message)
    }
  }

  function isFunction (obj, message, exception) {
    if (!Type.isFunction(obj)) {
      throwException(exception, message)
    }
  }

  function isNull (obj, message, exception) {
    if (!Type.isNull(obj)) {
      throwException(exception, message)
    }
  }

  function isNumber (obj, message, exception) {
    if (!Type.isNumber(obj)) {
      throwException(exception, message)
    }
  }

  function isObject (obj, message, exception) {
    if (!Type.isObject(obj)) {
      throwException(exception, message)
    }
  }

  function isRegExp (obj, message, exception) {
    if (!Type.isRegExp(obj)) {
      throwException(exception, message)
    }
  }

  function isString (obj, message, exception) {
    if (!Type.isString(obj)) {
      throwException(exception, message)
    }
  }

  function isUndefined (obj, message, exception) {
    if (!Type.isUndefined(obj)) {
      throwException(exception, message)
    }
  }

  function isNotArray (obj, message, exception) {
    if (Type.isArray(obj)) {
      throwException(exception, message)
    }
  }

  function isNotBoolean (obj, message, exception) {
    if (Type.isBoolean(obj)) {
      throwException(exception, message)
    }
  }

  function isNotDate (obj, message, exception) {
    if (Type.isDate(obj)) {
      throwException(exception, message)
    }
  }

  function isNotFunction (obj, message, exception) {
    if (Type.isFunction(obj)) {
      throwException(exception, message)
    }
  }

  function isNotNull (obj, message, exception) {
    if (Type.isNull(obj)) {
      throwException(exception, message)
    }
  }

  function isNotNumber (obj, message, exception) {
    if (Type.isNumber(obj)) {
      throwException(exception, message)
    }
  }

  function isNotObject (obj, message, exception) {
    if (Type.isObject(obj)) {
      throwException(exception, message)
    }
  }

  function isNotRegExp (obj, message, exception) {
    if (Type.isRegExp(obj)) {
      throwException(exception, message)
    }
  }

  function isNotString (obj, message, exception) {
    if (Type.isString(obj)) {
      throwException(exception, message)
    }
  }

  function isNotUndefined (obj, message, exception) {
    if (Type.isUndefined(obj)) {
      throwException(exception, message)
    }
  }

  function ensureIndex (min, max, index, message, exception) {
    if (Type.isNullOrUndefined(index) || index < min || index > max) {
      throwException(
        Dolphin.IndexException || exception,
        message || '索引 ' + index + ' 超出範圍 ' + min + ',' + max)
    }
  }

  function isTrue (condition, message, exception) {
    if (!condition) {
      throwException(exception, message || '條件必須是 True')
    }
  }

  function isInstanceOf (child, parent, message, exception) {
    if (!(child instanceof parent)) {
      throwException(
        exception,
        message || Type.getType(child) + ' 必須是 ' + Type.getType(parent) +
          ' 的實例')
    }
  }

  function isNotEmptyString (obj, message, exception) {
    if (!Type.isString(obj)) {
      throwException(exception, '物件不是字串')
    }

    if (obj.length === 0) {
      throwException(exception, message || '字串必須有值')
    }
  }

  function isEmptyString (obj, message, exception) {
    if (Type.isNotString(obj)) {
      throwException(exception, '物件不是字串')
    }

    if (obj.length !== 0) {
      throwException(exception, message || '字串必須無值')
    }
  }

  function isEqual (obj, other, message, exception) {
    if (!Type.deepEqual(obj, other)) {
      throwException(exception, message || '參數 obj 與 other 必須相同')
    }
  }

  function isNotEqual (obj, other, message, exception) {
    if (Type.deepEqual(obj, other)) {
      throwException(exception, message || '參數 obj 與 other 必須不相同')
    }
  }

  function hasKey (obj, key, message, exception) {
    if (!obj.hasOwnProperty(key)) {
      throwException(exception, message || '物件沒有鍵值 ' + key)
    }
  }

  function isNullOrUndefined (obj, message, exception) {
    if (Type.isNotNullOrUndefined(obj)) {
      throwException(exception, message)
    }
  }

  function isNotNullOrUndefined (obj, message, exception) {
    if (Type.isNullOrUndefined(obj)) {
      throwException(exception || Dolphin.NullException, message)
    }
  }

  // ---- export ------------------------------------------
  return {
    hasKey: hasKey,
    ensureIndex: ensureIndex,
    isArray: isArray,
    isBoolean: isBoolean,
    isDate: isDate,
    isEmptyString: isEmptyString,
    isEqual: isEqual,
    isFunction: isFunction,
    isInstanceOf: isInstanceOf,
    isNotArray: isNotArray,
    isNotBoolean: isNotBoolean,
    isNotDate: isNotDate,
    isNotEmptyString: isNotEmptyString,
    isNotEqual: isNotEqual,
    isNotFunction: isNotFunction,
    isNotNull: isNotNull,
    isNotNullOrUndefined: isNotNullOrUndefined,
    isNotNumber: isNotNumber,
    isNotObject: isNotObject,
    isNotRegExp: isNotRegExp,
    isNotString: isNotString,
    isNotUndefined: isNotUndefined,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString,
    isTrue: isTrue,
    isUndefined: isUndefined
  }
})()

/* global Dolphin */
Dolphin.Observable = function (source) {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var channels = {}

  function defineProperty (path, obj, key) {
    var value = obj[key]
    if (Type.isObject(value)) {
      traverseObject(path === '' ? key : path + '.' + key, value)
    }

    Object.defineProperty(obj, key, {
      get: function () {
        return value
      },
      set: function (newValue) {
        if (newValue === value) {
          return
        }
        value = newValue
        var channel = (path === '' ? '' : path + '.') + key
        notify(channel, newValue)
      },
      enumerable: true,
      configurable: false
    })
  }

  function notify (channel, event) {
    var globalObservers = channels['*'] || []
    var channelObservers = (channels[channel] || []).filter(
      function (observer) {
        return globalObservers.indexOf(observer) === -1
      })
    globalObservers.concat(channelObservers).forEach(function (observer) {
      try {
        observer(channel, event)
      } catch (e) {
        console.log(e)
      }
    })

    return this
  }

  function traverseObject (path, obj) {
    Object.keys(obj).forEach(function (key) {
      defineProperty(path, obj, key)
    })
  }

  function unwatch (channel, observer) {
    var observers = channels[channel] || []
    var index = observers.indexOf(observer)
    if (index >= 0) {
      channels[channel] = observers.slice(index, 1)
    }

    return this
  }

  function watch (channel, observer) {
    var observers = channels[channel] || []
    channels[channel] = observers
    observers.push(observer)

    return this
  }

  // ---- export ------------------------------------------
  traverseObject('', source || {})

  return {
    unwatch: unwatch,
    watch: watch
  }
}

/* global Dolphin */
Dolphin.StrUtils = (function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type
  var ArgumentException = Dolphin.ArgumentException

  // ---- export ------------------------------------------
  function throwException (message) {
    throw new ArgumentException(message)
  }

  function format (template) {
    if (arguments.length < 2) {
      throwException('至少要有二個參數')
    }

    if (Type.isNullOrUndefined(template)) {
      throwException('未指定 template')
    }

    var variables = template.match(/{([0-9]+)}/gi)
    if (Type.isNullOrUndefined(variables)) {
      throwException('未在指模板裡面設定變數')
    }

    if (variables.length !== arguments.length - 1) {
      throwException('變數與參數的數目不相同')
    }

    var result = template
    for (var i = 1; i < arguments.length; i++) {
      var regex = new RegExp('\\{' + i + '\\}', 'gi')
      if (!regex.test(template)) {
        throwException('在模板裡面沒有 ' + i + 1 + ' 的變數')
      }
      result = result.replace(regex, arguments[i])
    }

    return result
  }

  function rightPad (source, paddingString, length) {
    var result = source
    if (result.length >= length) {
      return result
    }

    while (result.length < length) {
      result = paddingString + result
    }

    return result
  }

  function repeat (pattern, count) {
    if (arguments.length < 2 || count < 0 || Type.isNullOrUndefined(pattern)) {
      throwException('參數錯誤')
    }

    return new Array(count + 1).join(pattern)
  }

  function remove (text, pattern) {
    var result = text
    while (result.indexOf(pattern) === 0) {
      result = result.substr(pattern.length)
    }

    return result
  }

  function occurrences (text, pattern) {
    var regex = new RegExp('^' + pattern + '*', 'g')
    var result = text.match(regex) || []

    return result.length > 0 ? result[0].length : 0
  }

  function startsWith (string, searchString, position) {
    return (string.substr(
      !position || position < 0 ? 0 : +position, searchString.length) ===
      searchString)
  }

  return {
    format: format,
    rightPad: rightPad,
    repeat: repeat,
    remove: remove,
    occurrences: occurrences,
    startsWith: startsWith
  }
})()

/* global Dolphin */
Dolphin.Log = (function (console) {
  // ---- enum -------------------------------------------
  var ErrorLevel = {
    all: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6,
    off: 7,
    trace: 8
  }

  // ---- Event -------------------------------------------
  function Event (errorLevel, message, timeStamp) {
    this.errorLevel = errorLevel
    this.timeStamp = timeStamp
    this.message = message
  }

  // ---- DefaultAppender ---------------------------------
  function DefaultAppender () {}

  DefaultAppender.prototype.append = function (event) {
    console.log(event.timeStamp.toISOString() + ' ' + event.message)
  }

  // ---- Log ------------------------------------------
  function Log () {
    this.appenders = []
  }

  Log.prototype.addAppender = function (appender) {
    this.appenders.push(appender)
  }

  Log.prototype.appendMessage = function (errorLevel, message) {
    var event = new Event(errorLevel, message, new Date())
    this.appenders.forEach(function (appender) {
      appender.append(event)
    })
  }

  Object.keys(ErrorLevel).forEach(function (level) {
    Log.prototype[level] = function (message) {
      this.appendMessage(level, message)
    }
  })

  // ---- export ------------------------------------------
  var log = new Log()
  log.addAppender(new DefaultAppender())

  return log
})(console)

/* global Dolphin */
Dolphin.DataBinding = function (obj, property) {
  // ---- private -----------------------------------------
  var bindings = []
  var value = obj[property]

  function valueGetter () {
    return value
  }

  function valueSetter (newValue) {
    value = newValue
    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i]
      binding.element[binding.attribute] = newValue
    }
  }

  Object.defineProperty(obj, property, {
    get: valueGetter,
    set: valueSetter
  })

  function attach (element, attribute, event) {
    Dolphin.Assert.isNotNull(element)
    var binding = {
      element: element,
      attribute: attribute
    }

    if (event) {
      element.addEventListener(event, function () {
        valueSetter(element[attribute])
      })
      binding.event = event
    }

    bindings.push(binding)
    element[attribute] = value

    return this
  }

  // ---- export ------------------------------------------
  return {
    attach: attach
  }
}

/* global Dolphin */
Dolphin.AutoMapper = function () {
  // ---- import ------------------------------------------
  var Assert = Dolphin.Assert
  var Type = Dolphin.Type
  var Types = Dolphin.Types

  // ---- private -----------------------------------------
  var profiles = {}

  function getKey (source) {
    var result = Type.isFunction(source) ? source.name : source
    Assert.isNotEmptyString(result, 'getKey 的結果不可以為空字串')

    return result
  }

  function buildProfileKey (source, target) {
    return getKey(source) + '->' + getKey(target)
  }

  function createMap (source, target) {
    var profileKey = buildProfileKey(source, target)
    profiles[profileKey] = {}
    var func = {
      forMember: function (property, any) {
        Assert.isNotEmptyString(property, '參數 property 必須有值')
        var profile = profiles[profileKey]
        Assert.isNotNullOrUndefined(profile)
        profile[property] = any

        return func
      }
    }

    return func
  }

  function map (source, target, sourceObject, targetObject) {
    Assert.isNotNullOrUndefined(sourceObject)
    Assert.isNotNullOrUndefined(targetObject)

    var profileKey = buildProfileKey(source, target)
    if (Type.isNullOrUndefined(profiles[profileKey])) {
      throw new Error('尚未定義 ' + source + ' 與 ' + target + ' 之間的對應關係')
    }

    var profile = profiles[profileKey]
    Assert.isNotNullOrUndefined(profile)

    Object.getOwnPropertyNames(sourceObject).forEach(function (property) {
      if (Type.isNullOrUndefined(profile[property])) {
        targetObject[property] = sourceObject[property]

        return
      }

      var any = profile[property]
      switch (Type.getType(any)) {
        case Types.Null:
          break

        case Types.Function:
          any(sourceObject, targetObject)
          break

        case Types.String:
          targetObject[any] = sourceObject[property]
          break
      }
    })
  }

  // ---- export ------------------------------------------
  var methods = {
    createMap: createMap,
    map: map
  }

  return Object.freeze(methods)
}