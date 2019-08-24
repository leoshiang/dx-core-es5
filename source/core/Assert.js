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
