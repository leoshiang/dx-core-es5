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
