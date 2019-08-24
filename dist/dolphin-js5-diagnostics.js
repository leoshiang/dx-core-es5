/* global Dolphin */
Dolphin.Tracer = (function () {
  // ---- import ------------------------------------------
  var Log = Dolphin.Log
  var StrUtils = Dolphin.StrUtils
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var enabled = true
  var callStack = []
  var options = {
    returnMark: '[return] ',
    enterMark: '==> ',
    leaveMark: '<== ',
    indentSize: 4,
    indentChar: ' ',
    maxOutputLineLength: 80
  }

  function output (message) {
    var numOfPaddingChars = callStack.length * options.indentSize
    var paddingChars = StrUtils.repeat(options.indentChar, numOfPaddingChars)
    Log.trace(paddingChars + message)
  }

  function enter (methodName) {
    if (!enabled) {
      return
    }

    output(options.enterMark + methodName)
    callStack.push(methodName)
  }

  function leave () {
    if (!enabled) {
      return
    }

    var methodName = callStack.pop()

    if (!Type.isNullOrUndefined(methodName)) {
      output(options.leaveMark + methodName)
    }
  }

  function enable () {
    enabled = true
  }

  function disable () {
    enabled = false
  }

  function isEnabled () {
    return enabled
  }

  var IgnoredMethods = ['watch', 'unwatch', 'notify']

  function trace (target, name) {
    if (!isEnabled()) {
      return
    }

    for (var propertyName in target) {
      if (IgnoredMethods.indexOf(propertyName) >= 0) {
        continue
      }

      var property = target[propertyName]
      if (Type.isNotFunction(property)) {
        continue
      }

      var instanceName = target.__className__ || name
      var qualifiedMethodName = instanceName + '.' + propertyName
      target[propertyName] = (function (originalMethod, methodName, instance) {
        return function () {
          var result
          try {
            enter(methodName)
            result = originalMethod.apply(instance, arguments)
          } catch (exception) {
            Log.trace(exception)
          } finally {
            leave()
          }
          return result
        }
      })(property, qualifiedMethodName, target)
    }
  }

  // ---- export ------------------------------------------
  return {
    disable: disable,
    enable: enable,
    enter: enter,
    leave: leave,
    isEnabled: isEnabled,
    trace: trace
  }
})()