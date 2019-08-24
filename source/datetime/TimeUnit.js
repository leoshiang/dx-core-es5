/* global Dolphin */
Dolphin.TimeUnit = (function () {
  var factors = [1, 24, 60, 60, 1000, 1]

  function getMillisecondsPerUnit (unitIndex) {
    return factors.filter(function (value, index) {
      return index >= unitIndex
    }).reduce(function (accumulator, currentValue) {
      return accumulator * currentValue
    })
  }

  var millisecondsPerUnit = {}
  var exports = {}

  'Day Hour Minute Second MSec'.split(' ').forEach(function (unitName, index) {
    millisecondsPerUnit[unitName] = getMillisecondsPerUnit(index + 1)
    exports['from' + unitName] = (function (unit) {
      return function (value) {
        return millisecondsPerUnit[unit] * value
      }
    })(unitName)

    exports['to' + unitName] = (function (unit) {
      return function (value) {
        return value / millisecondsPerUnit[unit]
      }
    })(unitName)
  })

  return exports
})()
