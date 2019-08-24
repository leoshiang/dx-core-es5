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
