/* global Dolphin, Polyfill */
Dolphin.Collection = function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type
  var Assert = Dolphin.Assert

  // ---- private -----------------------------------------
  var items = []

  function ensureIndex (index) {
    Assert.ensureIndex(0, items.length - 1, index, Dolphin.IndexException)
  }

  function ensureCollection (collection) {
    Assert.isNotNull(collection, Dolphin.NullException)
    Assert.isInstanceOf(collection, Dolphin.Collection, TypeError)
  }

  function add (item) {
    items.push(item)

    return this
  }

  function append (collection) {
    ensureCollection(collection)
    items = items.concat(collection.items)

    return this
  }

  function assign (collection) {
    ensureCollection(collection)
    items = collection.items.slice()

    return this
  }

  function clear () {
    items.length = 0
  }

  function clone () {
    return Dolphin.Collection(this)
  }

  function difference (collection) {
    ensureCollection(collection)
    var result = Dolphin.Collection()
    forEach(function (item) {
      if (!collection.includes(item)) {
        result.add(item)
      }
    })

    return result
  }

  function deleteAt (index) {
    ensureIndex(index)
    items.splice(index, 1)

    return this
  }

  function distinct () {
    var result = Dolphin.Collection()
    items.forEach(function (item) {
      if (!result.includes(item)) {
        result.add(item)
      }
    })

    return result
  }

  function equal (source) {
    if (source instanceof Array) {
      return (source.length === items.length && every(function (item, index) {
        return Type.deepEqual(source[index], item)
      }))
    }

    ensureCollection(source)
    if (source.count !== items.length) {
      return false
    }

    var result = true
    for (var i = 0; i < items.length; i++) {
      if (!Type.deepEqual(items[i], source.items[i])) {
        return false
      }
    }

    return result
  }

  function every (callback) {
    Assert.isFunction(callback)

    return items.every(callback)
  }

  function exchange (index1, index2) {
    ensureIndex(index1)
    ensureIndex(index2)
    var temp = items[index1]
    items[index1] = items[index2]
    items[index2] = temp

    return this
  }

  function fill (value, start, end) {
    Polyfill.fill.call(items, value, start, end)

    return this
  }

  function filter (callback) {
    Assert.isFunction(callback)

    return Dolphin.Collection(items.filter(callback))
  }

  function find (callback) {
    Assert.isFunction(callback)

    return items.find(callback)
  }

  function findIndex (callback) {
    Assert.isFunction(callback)

    return items.findIndex(callback)
  }

  function forEach (callback) {
    Assert.isFunction(callback)
    items.forEach(callback)

    return this
  }

  function from (arrayLike, mapFn, thisArg) {
    items = Array.from(arrayLike, mapFn, thisArg)

    return this
  }

  function get (index) {
    ensureIndex(index)

    return items[index]
  }

  function has (item) {
    return indexOf(item) >= 0
  }

  function includes (item) {
    return items.includes(item)
  }

  function indexOf (item) {
    return items.indexOf(item)
  }

  function indexOfItem (target) {
    for (var i = 0; i < items.length; i++) {
      if (Type.deepEqual(items[i], target)) {
        return i
      }
    }

    return -1
  }

  function insert (index, item) {
    ensureIndex(index)
    items.splice(index, 0, item)

    return this
  }

  function intersection (otherList) {
    ensureCollection(otherList)
    var result = new Dolphin.Collection()
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if (otherList.includes(item)) {
        result.items.push(item)
      }
    }

    return result
  }

  function isEmpty () {
    return items.length === 0
  }

  function map (callback) {
    Assert.isFunction(callback)
    var result = items.map(callback)

    return new Dolphin.Collection(result)
  }

  function move (oldIndex, newIndex) {
    while (oldIndex < 0) {
      oldIndex += items.length
    }

    while (newIndex < 0) {
      newIndex += items.length
    }

    if (newIndex >= items.length) {
      var k = newIndex - items.length + 1
      while (k--) {
        items.push(undefined)
      }
    }

    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0])

    return this
  }

  function put (index, item) {
    ensureIndex(index)
    items[index] = item

    return this
  }

  function reduce (callback, initialValue) {
    var result = items.reduce(callback, initialValue)
    if (Type.isArray(result)) {
      return new Dolphin.Collection(result)
    } else {
      return result
    }
  }

  function remove (item) {
    var index = indexOf(item)
    if (index >= 0) {
      items.splice(index, 1)
      return true
    }

    return false
  }

  function reverse () {
    items.reverse()

    return this
  }

  function sort (comparer) {
    items.sort(comparer)

    return this
  }

  function subset (collection) {
    ensureCollection(collection)
    for (var i = 0; i < items.length; i++) {
      if (!collection.includes(items[i])) {
        return false
      }
    }

    return true
  }

  function toArray () {
    return items
  }

  function union (collection) {
    ensureCollection(collection)
    var result = distinct()
    var i
    for (i = 0; i < collection.items.length; i++) {
      var otherItem = collection.items[i]
      if (!result.includes(otherItem)) {
        result.items.push(otherItem)
      }
    }

    return result
  }

  function getCount () {
    return items.length
  }

  function getItems () {
    return items
  }

  // ---- export ------------------------------------------
  var exports = {
    add: add,
    append: append,
    assign: assign,
    clear: clear,
    clone: clone,
    deleteAt: deleteAt,
    difference: difference,
    distinct: distinct,
    equal: equal,
    every: every,
    exchange: exchange,
    fill: fill,
    filter: filter,
    find: find,
    findIndex: findIndex,
    forEach: forEach,
    from: from,
    get: get,
    has: has,
    includes: includes,
    indexOf: indexOf,
    indexOfItem: indexOfItem,
    insert: insert,
    intersection: intersection,
    isEmpty: isEmpty,
    map: map,
    move: move,
    put: put,
    reduce: reduce,
    remove: remove,
    reverse: reverse,
    sort: sort,
    subset: subset,
    toArray: toArray,
    union: union
  }

  function addItem (item) {
    if (item instanceof Dolphin.Collection) {
      append(item)
    } else {
      add(item)
    }
  }

  Array.prototype.slice
    .call(arguments)
    .forEach(function (argument, i) {
      if (Type.isArray(argument)) {
        argument.forEach(function (item) {
          addItem(item)
        })
      } else {
        addItem(argument)
      }
    })

  var resultCollection = Type.extend(Object.create(Dolphin.Collection.prototype), exports)
  Type.defineProperty(resultCollection, 'count', getCount)
  Type.defineProperty(resultCollection, 'items', getItems)

  return resultCollection
}
