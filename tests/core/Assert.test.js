QUnit.module('Dolphin.Assert', function () {
  QUnit.module('isArray', function () {
    QUnit.test('傳入非陣列應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isArray({})
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入陣列不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isArray([]) === undefined)
    })
  })

  QUnit.module('isBoolean', function () {
    QUnit.test('傳入非 Boolean 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isBoolean(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入 Boolean 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isBoolean(true) === undefined)
    })
  })

  QUnit.module('isDate', function () {
    QUnit.test('傳入非日期應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isDate(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入日期不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isDate(new Date()) === undefined)
    })
  })

  QUnit.module('isFunction', function () {
    QUnit.test('傳入非函數應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isFunction(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入函數不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isFunction(function () {}) === undefined)
    })
  })

  QUnit.module('isInstanceOf', function () {
    QUnit.test('child 不是 parent 的執行個體應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isInstanceOf({}, Function)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('child 不是 parent 的執行個體不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isInstanceOf({}, Object) === undefined)
    })
  })

  QUnit.module('isNull', function () {
    QUnit.test('傳入非 null 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNull('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入 null 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNull(null) === undefined)
    })
  })

  QUnit.module('isNumber', function () {
    QUnit.test('傳入非數字應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNumber('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入數字不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNumber(1) === undefined)
    })
  })

  QUnit.module('isObject', function () {
    QUnit.test('傳入非物件應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isObject(true)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入物件不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isObject({}) === undefined)
    })
  })

  QUnit.module('isRegExp', function () {
    QUnit.test('傳入非 RegExp 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isRegExp(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入 RegExp 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isRegExp(/^.*/) === undefined)
    })
  })

  QUnit.module('isString', function () {
    QUnit.test('傳入非字串應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isString(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入字串不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isString('') === undefined)
    })
  })

  QUnit.module('isUndefined', function () {
    QUnit.test('傳入非 undefined 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isUndefined('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入 undefined 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isUndefined(undefined) === undefined)
    })
  })

  QUnit.module('isNullOrUndefined ', function () {
    QUnit.test('傳入非 undefined、null 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNullOrUndefined('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入 undefined 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNullOrUndefined(undefined) === undefined)
    })

    QUnit.test('傳入 null 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNullOrUndefined(null) === undefined)
    })
  })

  QUnit.module('isNotArray', function () {
    QUnit.test('傳入陣列應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotArray([])
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非陣列不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotArray(1) === undefined)
    })
  })

  QUnit.module('isNotBoolean', function () {
    QUnit.test('傳入 Boolean 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotBoolean(true)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非 Boolean 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotBoolean(1) === undefined)
    })
  })

  QUnit.module('isNotDate', function () {
    QUnit.test('傳入日期應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotDate(new Date())
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非日期不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotDate(1) === undefined)
    })
  })

  QUnit.module('isNotFunction', function () {
    QUnit.test('傳入函數應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotFunction(function () {})
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非函數不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotFunction(1) === undefined)
    })
  })

  QUnit.module('isNotNull', function () {
    QUnit.test('傳入 null 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotNull(null)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非 null 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotNull('') === undefined)
    })
  })

  QUnit.module('isNotNumber', function () {
    QUnit.test('傳入數字應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotNumber(1)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非數字不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotNumber('') === undefined)
    })
  })

  QUnit.module('isNotObject', function () {
    QUnit.test('傳入物件應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotObject({})
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非物件不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotObject(1) === undefined)
    })
  })

  QUnit.module('isNotRegExp', function () {
    QUnit.test('傳入 RegExp 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotRegExp(/^.*/)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非 RegExp 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotRegExp(1) === undefined)
    })
  })

  QUnit.module('isNotString', function () {
    QUnit.test('傳入字串應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotString('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非字串不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotString(1) === undefined)
    })
  })

  QUnit.module('isNotUndefined', function () {
    QUnit.test('傳入 undefined 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotUndefined(undefined)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非 undefined 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotUndefined('') === undefined)
    })
  })

  QUnit.module('isNotNullOrUndefined  ', function () {
    QUnit.test('傳入 undefined 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotNullOrUndefined(undefined)
        },
        function (error) {
          return error instanceof Dolphin.NullException
        }
      )
    })

    QUnit.test('傳入 null 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotNullOrUndefined(null)
        },
        function (error) {
          return error instanceof Dolphin.NullException
        }
      )
    })

    QUnit.test('傳入非 undefined、null 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotNullOrUndefined({}) === undefined)
    })
  })

  QUnit.module('isNotEmptyString', function () {
    QUnit.test('傳入空字串應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isNotEmptyString('')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非空字串不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isNotEmptyString('abc') === undefined)
    })
  })

  QUnit.module('isEmptyString', function () {
    QUnit.test('傳入非字串應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isEmptyString({})
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入非空字串應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isEmptyString('abc')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('傳入空字串不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isEmptyString('') === undefined)
    })
  })

  QUnit.module('isEqual', function () {
    QUnit.test('物件屬性不相同應拋出例外', function (assert) {
      assert.throws(
        function () {
          var objA = {
            name: 'objA',
            size: 1
          }

          var objB = {
            name: 'objB'
          }

          Dolphin.Assert.isEqual(objA, objB)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('物件屬性相同不應該拋出例外', function (assert) {
      var objA = {
        name: 'objA',
        size: 1
      }

      var objB = {
        name: 'objA',
        size: 1
      }

      assert.ok(Dolphin.Assert.isEqual(objA, objB) === undefined)
    })
  })

  QUnit.module('isNotEqual', function () {
    QUnit.test('物件屬性相同應拋出例外', function (assert) {
      assert.throws(
        function () {
          var objA = {
            name: 'objA',
            size: 1
          }

          var objB = {
            name: 'objA',
            size: 1
          }

          Dolphin.Assert.isNotEqual(objA, objB)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('物件屬性不相同不應該拋出例外', function (assert) {
      var objA = {
        name: 'objA',
        size: 1
      }

      var objB = {
        name: 'objB'
      }

      assert.ok(Dolphin.Assert.isNotEqual(objA, objB) === undefined)
    })
  })

  QUnit.module('hasKey', function () {
    QUnit.test('物件沒有指定的屬性應該拋出例外', function (assert) {
      assert.throws(
        function () {
          var objA = {
            name: 'objA',
            size: 1
          }

          Dolphin.Assert.hasKey(objA, 'age')
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('物件有指定的屬性不應該拋出例外', function (assert) {
      var objA = {
        name: 'objA',
        size: 1
      }

      assert.ok(Dolphin.Assert.hasKey(objA, 'name') === undefined)
    })
  })

  QUnit.module('isTrue', function () {
    QUnit.test('條件等於 false 應該拋出例外', function (assert) {
      assert.throws(
        function () {
          Dolphin.Assert.isTrue(false)
        },
        function (error) {
          return error instanceof Dolphin.AssertException
        }
      )
    })

    QUnit.test('條件等於 true 不應該拋出例外', function (assert) {
      assert.ok(Dolphin.Assert.isTrue(true) === undefined)
    })
  })
})
