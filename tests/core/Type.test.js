QUnit.module('Dolphin.Type', function () {
  var Type = Dolphin.Type
  var Types = Dolphin.Types
  var getType = Type.getType

  QUnit.module('getType', function () {
    QUnit.test('應能正確取得陣列的型別', function (assert) {
      assert.ok(getType([]) === Types.Array)
    })

    QUnit.test('應能正確取得物件的型別', function (assert) {
      assert.ok(getType({}) === Types.Object)
    })

    QUnit.test('應能正確取得字串的型別', function (assert) {
      assert.ok(getType('sss') === Types.String)
    })

    QUnit.test('應能正確取得日期的型別', function (assert) {
      assert.ok(getType(new Date()) === Types.Date)
    })

    QUnit.test('應能正確取得 RegExp 的型別', function (assert) {
      assert.ok(getType(/^.*/) === Types.RegExp)
    })

    QUnit.test('應能正確取得函數的型別', function (assert) {
      assert.ok(getType(function () {}) === Types.Function)
    })

    QUnit.test('應能正確取得 Boolean 的型別', function (assert) {
      assert.ok(getType(1 === 1) === Types.Boolean)
    })

    QUnit.test('應能正確取得數字的型別', function (assert) {
      assert.ok(getType(1) === Types.Number)
    })

    QUnit.test('應能正確取得 Null 的型別', function (assert) {
      assert.ok(getType(null) === Types.Null)
    })

    QUnit.test('應能正確取得 Undefined 的型別', function (assert) {
      assert.ok(getType(undefined) === Types.Undefined)
    })
  })

  QUnit.module('isArray', function () {
    QUnit.test('不是傳入陣列應該回傳 false', function (assert) {
      assert.notOk(Type.isArray(1))
    })

    QUnit.test('傳入陣列應該回傳 true', function (assert) {
      assert.ok(Type.isArray([]))
    })
  })

  QUnit.module('isObject', function () {
    QUnit.test('不是傳入物件應該回傳 false', function (assert) {
      assert.notOk(Type.isObject(1))
    })

    QUnit.test('傳入物件應該回傳 true', function (assert) {
      assert.ok(Type.isObject({}))
    })
  })

  QUnit.module('isString', function () {
    QUnit.test('不是傳入字串應該回傳 false', function (assert) {
      assert.notOk(Type.isString(1))
    })

    QUnit.test('傳入字串應該回傳 true', function (assert) {
      assert.ok(Type.isString(''))
    })
  })

  QUnit.module('isDate', function () {
    QUnit.test('不是傳入日期應該回傳 false', function (assert) {
      assert.notOk(Type.isDate(1))
    })

    QUnit.test('傳入日期應該回傳 true', function (assert) {
      assert.ok(Type.isDate(new Date()))
    })
  })

  QUnit.module('isRegExp', function () {
    QUnit.test('不是傳入 RegExp 應該回傳 false', function (assert) {
      assert.notOk(Type.isRegExp(1))
    })

    QUnit.test('傳入 RegExp 應該回傳 true', function (assert) {
      assert.ok(Type.isRegExp(/^.*/))
    })
  })

  QUnit.module('isFunction', function () {
    QUnit.test('不是傳入函數應該回傳 false', function (assert) {
      assert.notOk(Type.isFunction(1))
    })

    QUnit.test('傳入函數應該回傳 true', function (assert) {
      assert.ok(Type.isFunction(function () {}))
    })
  })

  QUnit.module('isBoolean', function () {
    QUnit.test('不是傳入函數應該回傳 false', function (assert) {
      assert.notOk(Type.isBoolean(1))
    })

    QUnit.test('isBoolean 傳入函數應該回傳 true', function (assert) {
      assert.ok(Type.isBoolean(true))
    })
  })

  QUnit.module('isNumber', function () {
    QUnit.test('不是傳入數字應該回傳 false', function (assert) {
      assert.notOk(Type.isNumber(''))
    })

    QUnit.test('isNumber 傳入數字應該回傳 true', function (assert) {
      assert.ok(Type.isNumber(1))
    })
  })

  QUnit.module('isNull', function () {
    QUnit.test('不是傳入 null 應該回傳 false', function (assert) {
      assert.notOk(Type.isNull(1))
    })

    QUnit.test('傳入 null 應該回傳 true', function (assert) {
      assert.ok(Type.isNull(null))
    })
  })

  QUnit.module('isUndefined', function () {
    QUnit.test('不是傳入 undefined 應該回傳 false', function (assert) {
      assert.notOk(Type.isUndefined(1))
    })
  })

  QUnit.module('isNotArray', function () {
    QUnit.test('不是傳入陣列應該回傳 true', function (assert) {
      assert.ok(Type.isNotArray(1))
    })

    QUnit.test('傳入陣列應該回傳 false', function (assert) {
      assert.notOk(Type.isNotArray([]))
    })
  })

  QUnit.module('isNotObject', function () {
    QUnit.test('不是傳入物件應該回傳 true', function (assert) {
      assert.ok(Type.isNotObject(1))
    })

    QUnit.test('傳入物件應該回傳 false', function (assert) {
      assert.notOk(Type.isNotObject({}))
    })
  })

  QUnit.module('isNotString', function () {
    QUnit.test('不是傳入字串應該回傳 true', function (assert) {
      assert.ok(Type.isNotString(1))
    })

    QUnit.test('傳入字串應該回傳 false', function (assert) {
      assert.notOk(Type.isNotString(''))
    })
  })

  QUnit.module('isNotDate', function () {
    QUnit.test('不是傳入日期應該回傳 true', function (assert) {
      assert.ok(Type.isNotDate(1))
    })

    QUnit.test('傳入日期應該回傳 false', function (assert) {
      assert.notOk(Type.isNotDate(new Date()))
    })
  })

  QUnit.module('isNotRegExp', function () {
    QUnit.test('不是傳入 RegExp 應該回傳 true', function (assert) {
      assert.ok(Type.isNotRegExp(1))
    })

    QUnit.test('傳入 RegExp 應該回傳 false', function (assert) {
      assert.notOk(Type.isNotRegExp(/^.*/))
    })
  })

  QUnit.module('isNotFunction', function () {
    QUnit.test('不是傳入函數應該回傳 true', function (assert) {
      assert.ok(Type.isNotFunction(1))
    })

    QUnit.test('傳入函數應該回傳 false', function (assert) {
      assert.notOk(Type.isNotFunction(function () {}))
    })
  })

  QUnit.module('isNotBoolean', function () {
    QUnit.test('不是傳入函數應該回傳 true', function (assert) {
      assert.ok(Type.isNotBoolean(1))
    })

    QUnit.test('isNotBoolean 傳入函數應該回傳 false', function (assert) {
      assert.notOk(Type.isNotBoolean(false))
    })
  })

  QUnit.module('isNotNumber', function () {
    QUnit.test('不是傳入數字應該回傳 true', function (assert) {
      assert.ok(Type.isNotNumber(''))
    })

    QUnit.test('isNotNumber 傳入數字應該回傳 false', function (assert) {
      assert.notOk(Type.isNotNumber(1))
    })
  })

  QUnit.module('isNotNull', function () {
    QUnit.test('不是傳入 null 應該回傳 true', function (assert) {
      assert.ok(Type.isNotNull(1))
    })

    QUnit.test('傳入 null 應該回傳 false', function (assert) {
      assert.notOk(Type.isNotNull(null))
    })
  })

  QUnit.module('isNotUndefined', function () {
    QUnit.test('不是傳入 undefined 應該回傳 true', function (assert) {
      assert.ok(Type.isNotUndefined(1))
    })
  })

  QUnit.module('isNullOrUndefined', function () {
    QUnit.test('傳入 undefined 或 null 應該回傳 true', function (assert) {
      assert.ok(Type.isNullOrUndefined(undefined))
      assert.ok(Type.isNullOrUndefined(null))
    })

    QUnit.test('不是傳入 undefined & null 應該回傳 false', function (assert) {
      assert.notOk(Type.isNullOrUndefined(1))
    })
  })

  QUnit.module('isNotNullOrUndefined', function () {
    QUnit.test('傳入 undefined & null 應該回傳 false', function (assert) {
      assert.notOk(Type.isNotNullOrUndefined(undefined))
      assert.notOk(Type.isNotNullOrUndefined(null))
    })

    QUnit.test('不是傳入 undefined & null 應該回傳 true', function (assert) {
      assert.ok(Type.isNotNullOrUndefined(1))
    })
  })

  QUnit.module('isZero', function () {
    QUnit.test('傳入非數值應該回傳 false', function (assert) {
      assert.notOk(Type.isZero({}))
      assert.notOk(Type.isZero('0'))
    })

    QUnit.test('傳入非零數值應該回傳 false', function (assert) {
      assert.notOk(Type.isZero(2))
    })

    QUnit.test('傳入數值零應該回傳 true', function (assert) {
      assert.ok(Type.isZero(0))
    })
  })

  QUnit.module('isNegativeNumber ', function () {
    QUnit.test('傳入非數值應該回傳 false', function (assert) {
      assert.notOk(Type.isSmallThanZero({}))
      assert.notOk(Type.isSmallThanZero('0'))
    })

    QUnit.test('傳入 2 應該回傳 false', function (assert) {
      assert.notOk(Type.isSmallThanZero(2))
    })

    QUnit.test('傳入 0 應該回傳 false', function (assert) {
      assert.notOk(Type.isSmallThanZero(0))
    })

    QUnit.test('傳入數值 -1 應該回傳 true', function (assert) {
      assert.ok(Type.isSmallThanZero(-1))
    })
  })

  QUnit.module('merge', function () {
    QUnit.test('傳入一個物件應能正常執行', function (assert) {
      var objectA = {
        propA: 'propA',
        methodA: function () {},
        objectB: {
          propB: 1,
          methodB: function () {},
          objectC: {
            propC: [1, 2, 3],
            methodC: function () {}
          }
        }
      }

      var merged = Type.merge(objectA)
      assert.ok(Type.isString(merged.propA))
      assert.ok(Type.isFunction(merged.methodA))
      assert.ok(Type.isObject(merged.objectB))
      assert.ok(Type.isNumber(merged.objectB.propB))
      assert.ok(Type.isFunction(merged.objectB.methodB))
      assert.ok(Type.isObject(merged.objectB.objectC))
      assert.ok(Type.isArray(merged.objectB.objectC.propC))
      assert.ok(Type.isFunction(merged.objectB.objectC.methodC))
    })

    QUnit.test('傳入三個物件應能正常執行', function (assert) {
      var objectA = {
        propA: 'propA',
        methodA: function () {}
      }

      var objectB = {
        propB: 1,
        methodB: function () {}
      }

      var objectC = {
        propC: [1, 2, 3],
        methodC: function () {}
      }

      var merged = Type.merge(objectA, objectB, objectC)
      assert.ok(Type.isString(merged.propA))
      assert.ok(Type.isFunction(merged.methodA))
      assert.ok(Type.isNumber(merged.propB))
      assert.ok(Type.isFunction(merged.methodB))
      assert.ok(Type.isArray(merged.propC))
      assert.ok(Type.isFunction(merged.methodC))
    })

    QUnit.test('傳入 null 物件應能正常執行', function (assert) {
      var objectA = {
        propA: 'propA',
        methodA: function () {},
        objectB: {
          propB: 1,
          methodB: function () {},
          objectC: {
            propC: [1, 2, 3],
            methodC: function () {}
          }
        }
      }

      var merged = Type.merge(objectA, null)
      assert.ok(Type.isString(merged.propA))
      assert.ok(Type.isFunction(merged.methodA))
      assert.ok(Type.isObject(merged.objectB))
      assert.ok(Type.isNumber(merged.objectB.propB))
      assert.ok(Type.isFunction(merged.objectB.methodB))
      assert.ok(Type.isObject(merged.objectB.objectC))
      assert.ok(Type.isArray(merged.objectB.objectC.propC))
      assert.ok(Type.isFunction(merged.objectB.objectC.methodC))
    })
  })

  QUnit.module('iterator', function () {
    QUnit.test(Types.Array, function (assert) {
      var a = ['a', 'b', 'c']
      var i = Type.iterator(a)
      var r
      var result = []
      while (!(r = i.next()).done) {
        result.push(r.value)
      }
      assert.ok(a[0] === result[0])
      assert.ok(a[1] === result[1])
      assert.ok(a[2] === result[2])
    })

    QUnit.test(Types.Object, function (assert) {
      var a = {
        name: 'Beauty of JavaScript',
        price: 400,
        isbn: 'xxx'
      }
      var i = Type.iterator(a)
      var r
      var result = []
      while (!(r = i.next()).done) {
        result.push(r.value)
      }

      assert.deepEqual(result, [a.name, a.price, a.isbn])
    })
  })

  QUnit.module('extend', function () {
    QUnit.test('沒有相同的屬性，應該能正常複製', function (assert) {
      var objectA = {
        propA: 'propA',
        methodA: function () {},
        propA1: [],
        propA2: undefined
      }

      var objectB = {
        propB: 1,
        methodB: function () {},
        propB2: undefined,
        propB3: [],
        propA2: undefined
      }

      Type.extend(objectA, objectB)
      assert.ok(Type.isString(objectA.propA))
      assert.ok(Type.isFunction(objectA.methodA))
      assert.ok(Type.isNumber(objectA.propB))
      assert.ok(Type.isFunction(objectA.methodB))
    })

    QUnit.test('來源屬性是陣列，目的屬性是 undefined，目的屬性應變成陣列', function (assert) {
      var source = {
        propArray: [1, 2, 3]
      }

      var target = {}

      Type.extend(target, source)
      assert.ok(Type.isArray(target.propArray))
      assert.equal(target.propArray.length, 3)
      assert.equal(target.propArray[0], 1)
      assert.equal(target.propArray[1], 2)
      assert.equal(target.propArray[2], 3)
    })

    QUnit.test('來源屬性是物件，目的屬性是 undefined，目的屬性應變成物件', function (assert) {
      var source = {
        propArray: {}
      }

      var target = {}

      Type.extend(target, source)
      assert.ok(Type.isObject(target.propArray))
    })

    QUnit.test('來源屬性是陣列，目的屬性不是陣列，目的屬性應變成陣列', function (assert) {
      var source = {
        propArray: [1, 2, 3]
      }

      var target = {
        propArray: {}
      }

      Type.extend(target, source)
      assert.ok(Type.isArray(target.propArray))
      assert.equal(target.propArray.length, 3)
      assert.equal(target.propArray[0], 1)
      assert.equal(target.propArray[1], 2)
      assert.equal(target.propArray[2], 3)
    })

    QUnit.test('來源屬性不是陣列，目的屬性是陣列，目的屬性應變成物件', function (assert) {
      var source = {
        propArray: {}
      }

      var target = {
        propArray: []
      }

      Type.extend(target, source)
      assert.ok(Type.isObject(target.propArray))
    })
  })

  QUnit.module('deepEqual', function () {
    QUnit.test('型別不相同應回傳 false', function (assert) {
      assert.notOk(Type.deepEqual({}, []))
    })

    QUnit.test('null 和 undefined 應回傳 false', function (assert) {
      assert.notOk(Type.deepEqual(null, undefined))
    })

    QUnit.test('null 和 undefined 應回傳 false', function (assert) {
      assert.notOk(Type.deepEqual(null, undefined))
    })

    QUnit.test('undefined 應回傳 false', function (assert) {
      assert.notOk(Type.deepEqual(undefined, {}))
    })

    QUnit.test('函數宣告式應比較整個函數內容', function (assert) {
      function A () {
        return 'A'
      }

      assert.ok(Type.deepEqual(A, A))
    })

    QUnit.test('匿名函數相同內容不同名稱應回傳 true', function (assert) {
      var a = function () {
        return 1
      }
      var b = function () {
        return 1
      }
      assert.ok(Type.deepEqual(a, b))
    })
  })

  QUnit.module('getSortedKeys ', function () {
    QUnit.test('有效物件應回傳排序過的陣列', function (assert) {
      var obj = {
        name: 'name',
        code: 'code',
        prop: 'prop'
      }
      var result = Type.getSortedKeys(obj)
      assert.ok(Type.isArray(result))
      assert.ok(result.length === 3)
      assert.ok(result[0] === 'code')
      assert.ok(result[1] === 'name')
      assert.ok(result[2] === 'prop')
    })

    QUnit.test('無效物件應回傳空陣列', function (assert) {
      var result = Type.getSortedKeys()
      assert.ok(Type.isArray(result))
      assert.ok(result.length === 0)
    })
  })
})
