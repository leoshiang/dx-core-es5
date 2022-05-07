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

/* global Dolphin */
Dolphin.Period = function (startTime, endTime) {
  // ---- import ------------------------------------------
  var Assert = Dolphin.Assert
  var TimeUnit = Dolphin.TimeUnit
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var start = startTime || new Date()
  var end = endTime || new Date()

  function ensureArgumentIsPeriod (arg) {
    Assert.isNotNullOrUndefined(arg)
    Assert.isTrue(arg instanceof Dolphin.Period)
  }

  function ensureArgumentIsDate (arg) {
    Assert.isNotNullOrUndefined(arg)
    Assert.isDate(arg)
  }

  function checkIfArgumentIsDate (arg) {
    if (Type.isNotNullOrUndefined(arg)) {
      Assert.isDate(arg)
    }
  }

  function duration () {
    return Math.floor(TimeUnit.toDay(end - start) + 1)
  }

  function clone () {
    return new Dolphin.Period(start, end)
  }

  function contains (date) {
    ensureArgumentIsDate(date)

    return date >= start && date <= end
  }

  function equals (period) {
    ensureArgumentIsPeriod(period)

    return (start.valueOf() === period.start.valueOf() && end.valueOf() ===
      period.end.valueOf())
  }

  function intersection (period) {
    ensureArgumentIsPeriod(period)

    if (!overlaps(period)) {
      return null
    }

    return new Dolphin.Period(new Date(Math.max(start, period.start)),
      new Date(Math.min(end, period.end)))
  }

  function overlaps (period) {
    ensureArgumentIsPeriod(period)

    return !(end < period.start || start > period.end)
  }

  function union (period) {
    ensureArgumentIsPeriod(period)

    return new Dolphin.Period(
      new Date(Math.min(start, period.start)),
      new Date(Math.max(end, period.end)))
  }

  function getStart () {
    return start
  }

  function getEnd () {
    return end
  }

  // ---- export ------------------------------------------
  Assert.isTrue(start <= end)
  checkIfArgumentIsDate(start)
  checkIfArgumentIsDate(end)

  var methods = {
    duration: duration,
    clone: clone,
    contains: contains,
    equals: equals,
    intersection: intersection,
    overlaps: overlaps,
    union: union
  }

  var exports = Type.extend(Object.create(Dolphin.Period.prototype), methods)
  Type.defineProperty(exports, 'start', getStart)
  Type.defineProperty(exports, 'end', getEnd)

  return exports
}