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
