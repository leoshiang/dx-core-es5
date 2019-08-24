QUnit.module('Dolphin.AutoMapper', function () {
  QUnit.module('constructor', function () {
    QUnit.test('傳入無效的名稱應該拋出例外', function (assert) {
      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap('', '')
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })

      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap('', null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap(undefined, null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })
  })

  QUnit.module('forMember', function () {
    QUnit.test('傳入無效的屬性名稱應該拋出例外', function (assert) {
      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap('a', 'b').forMember('', '')
      }, function (error) {
        return error instanceof Error
      })

      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap('a', 'b').forMember('', null)
      }, function (error) {
        return error instanceof Error
      })

      assert.throws(function () {
        var autoMapper = new Dolphin.AutoMapper()
        autoMapper.createMap('a', 'b').forMember(undefined, null)
      }, function (error) {
        return error instanceof Error
      })
    })

    QUnit.test('傳入 function 不應該拋出例外', function (assert) {
      var autoMapper = new Dolphin.AutoMapper()
      autoMapper.createMap('a', 'b').forMember('name', function (src, dst) {
        return 'Hi ' + src.name
      })
      assert.ok(true)
    })
  })

  QUnit.module('map', function () {
    QUnit.test('不指定屬性對應，目的物件的屬性應該都來源物件的屬性相等', function (assert) {
      var autoMapper = new Dolphin.AutoMapper()
      autoMapper.createMap('entity', 'viewModel')

      var source = {
        name: 'JavaScript 之美',
        isbn: '978-986-347-859-1',
        price: 400
      }

      var target = {
        name: '重構 JavaScript',
        isbn: '978-986-476-682-6',
        price: 680
      }

      autoMapper.map('entity', 'viewModel', source, target)

      assert.equal(target.name, source.name)
      assert.equal(target.isbn, source.isbn)
      assert.equal(target.price, source.price)
    })

    QUnit.test('指定 function，目的物件的屬性應該能正常對應', function (assert) {
      var autoMapper = new Dolphin.AutoMapper()
      autoMapper
        .createMap('entity', 'viewModel')
        .forMember('price', function (source, target) {
          target.price = source.price * 0.9
        })

      var source = {
        name: 'JavaScript 之美',
        isbn: '978-986-347-859-1',
        price: 400
      }

      var target = {
        name: '重構 JavaScript',
        isbn: '978-986-476-682-6',
        price: 680
      }

      autoMapper.map('entity', 'viewModel', source, target)

      assert.equal(target.price, 360)
    })

    QUnit.test('enum 應該能正常轉換', function (assert) {
      var BookCategory = {
        JavaScript: 1,
        CSharp: 2
      }

      function nameOf (enums, value) {
        return Object.getOwnPropertyNames(enums).filter(function (prop) {
          return enums[prop] === value
        })[0]
      }

      var autoMapper = new Dolphin.AutoMapper()
      autoMapper
        .createMap('entity', 'viewModel')
        .forMember('category', function (source, target) {
          target.category = nameOf(BookCategory, source.category)
        })

      var source = {
        name: 'JavaScript 之美',
        isbn: '978-986-347-859-1',
        category: 1,
        price: 400
      }

      var target = {}

      autoMapper.map('entity', 'viewModel', source, target)

      assert.equal(target.category, 'JavaScript')
    })
  })
})
