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
