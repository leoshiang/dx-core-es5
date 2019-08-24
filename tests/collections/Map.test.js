QUnit.module('Dolphin.Map', function () {
  QUnit.module('基本測試', function () {
    var key1 = 'string'
    var key2 = 'object'
    var key3 = 'function'
    var value1 = 'this is a string'
    var value2 = {
      name: 'Object',
      length: 10
    }
    var value3 = function () {}

    QUnit.test('讀寫應相等', function (assert) {
      var map = Dolphin.Map()

      map.set(key1, value1)
      map.set(key2, value2)
      map.set(key3, value3)

      assert.equal(map.size, 3)
      assert.equal(map.get(key1), value1)
      assert.equal(map.get(key2), value2)
      assert.equal(map.get(key3), value3)
    })

    QUnit.test('刪除鍵值，size 應減一', function (assert) {
      var map = Dolphin.Map()

      map.set(key1, value1)
      map.set(key2, value2)
      map.set(key3, value3)
      map.remove(key1)

      assert.equal(map.size, 2)
    })

    QUnit.test('清除，size 應為 0', function (assert) {
      var map = Dolphin.Map()

      map.set(key1, value1)
      map.set(key2, value2)
      map.set(key3, value3)
      map.clear()

      assert.equal(map.size, 0)
    })

    QUnit.test('forEach，應為回傳每個 value 和 key', function (assert) {
      var map = Dolphin.Map()

      map.set(key3, value3)
      map.set(key2, value2)
      map.set(key1, value1)

      var result = []
      map.forEach(function (value, key) {
        result.push(value)
      })

      assert.equal(result.length, 3)
    })

    QUnit.test('has 應回傳 key 是否存在', function (assert) {
      var map = Dolphin.Map()

      map.set(key3, value3)
      map.set(key2, value2)
      map.set(key1, value1)

      assert.ok(map.has(key1))
      assert.ok(map.has(key2))
      assert.ok(map.has(key3))
      assert.notOk(map.has(key3 + 'a'))
    })

    QUnit.test('keys 應回傳 iterator', function (assert) {
      var map = Dolphin.Map()

      map.set(key3, value3)
      map.set(key2, value2)
      map.set(key1, value1)

      var iterator = map.keys()
      assert.equal(iterator.next().value, key3)
      assert.equal(iterator.next().value, key2)
      assert.equal(iterator.next().value, key1)
    })

    QUnit.test('values 應回傳 iterator', function (assert) {
      var map = Dolphin.Map()

      map.set(key3, value3)
      map.set(key2, value2)
      map.set(key1, value1)

      var iterator = map.values()
      assert.equal(iterator.next().value, value3)
      assert.equal(iterator.next().value, value2)
      assert.equal(iterator.next().value, value1)
    })
  })
})
