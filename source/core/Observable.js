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
