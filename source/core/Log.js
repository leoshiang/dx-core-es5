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
