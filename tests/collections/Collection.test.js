QUnit.module('Dolphin.Collection', function () {
  QUnit.module('Dolphin.Collections.constructor', function () {
    QUnit.test('呼叫建構子，應建立物件', function (assert) {
      var collection = Dolphin.Collection()
      assert.equal(typeof collection, 'object')
    })

    QUnit.test('呼叫建構子傳入 List，應與傳入的 List 相同', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection(collection1)
      assert.ok(collection2.equal(collection1))
    })

    QUnit.test('呼叫建構子傳入多個陣列，應加入每個陣列的元素', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([4, 5, 6])
      var collection3 = Dolphin.Collection([collection1, collection2])
      assert.ok(collection3.equal([1, 2, 3, 4, 5, 6]))
    })

    QUnit.test('呼叫建構子傳入多個項目，應將每個項目加入', function (assert) {
      var collection = Dolphin.Collection('a', 'b', 'c')
      assert.equal(collection.count, 3)
      assert.equal(collection.get(0), 'a')
      assert.equal(collection.get(1), 'b')
      assert.equal(collection.get(2), 'c')
    })

    QUnit.test('呼叫建構子傳入多個陣列與項目，應將每個陣列與項目加入', function (assert) {
      var collection = Dolphin.Collection(['a', 'b', 'c'], 'g', ['d', 'e', 'f'])
      assert.equal(collection.count, 7)
      assert.equal(collection.get(0), 'a')
      assert.equal(collection.get(1), 'b')
      assert.equal(collection.get(2), 'c')
      assert.equal(collection.get(3), 'g')
      assert.equal(collection.get(4), 'd')
      assert.equal(collection.get(5), 'e')
      assert.equal(collection.get(6), 'f')
    })

    QUnit.test('呼叫建構子傳入不同型別的項目，應將每個項目加入', function (assert) {
      var collection = Dolphin.Collection('a', 1, new Date(), {})
      assert.equal(collection.count, 4)
      assert.equal(collection.get(0), 'a')
      assert.equal(collection.get(1), 1)
      assert.ok(collection.get(2) instanceof Date)
      assert.ok(collection.get(3) instanceof Object)
    })
  })

  QUnit.module('Dolphin.Collection.add', function () {
    QUnit.test('無參數，應加入 1 個 undefined 的項目', function (assert) {
      var collection = Dolphin.Collection()
      collection.add()
      assert.equal(collection.get(0), undefined)
    })

    QUnit.test('加入 1 個項目，第 0 個項目應為加入的項目', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(999)
      assert.equal(collection.count, 1)
    })

    QUnit.test('加入 undefined，第 0 個項目應為 undefined', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(undefined)
      assert.equal(collection.get(0), undefined)
    })

    QUnit.test('加入 null，第 0 個項目應為 null', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(null)
      assert.equal(collection.get(0), null)
    })

    QUnit.test('使用方法鏈加入三個項目，長度應等於 3', function (assert) {
      var collection = Dolphin.Collection()
                              .add(1)
                              .add(2)
                              .add(3)
      assert.equal(collection.count, 3)
    })
  })

  QUnit.module('Dolphin.Collection.append', function () {
    QUnit.test('傳入 null，應拋出 Dolphin.NullException', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.append(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('傳入非 List，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.append([])
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('傳入 collection， collection 的項目應被加入', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection().append(collection1)
      assert.expect(3)
      collection1.forEach(function (item) {
        assert.ok(collection2.includes(item))
      })
    })
  })

  QUnit.module('Dolphin.Collection.assign', function () {
    QUnit.test('指派 null ，應拋出例外 Dolphin.NullException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.assign(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('指派 undefined ，應拋出例外 Dolphin.NullException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.assign(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('指派非 List 型態，應拋出例外 TypeError', function (assert) {
      function assign (type) {
        var collection = Dolphin.Collection()
        assert.throws(function () {
          collection.assign(type)
        }, function (error) {
          return error instanceof Dolphin.AssertException
        })
      }

      assign({})
      assign(1)
      assign('')
      assign(function () {})
    })

    QUnit.test('指派 List ，內容應被取代', function (assert) {
      var collection1 = Dolphin.Collection([4, 5, 6])
      var collection2 = Dolphin.Collection([1, 2, 3])
      collection2.assign(collection1)
      assert.equal(collection2.count, 3)
      assert.equal(collection2.get(0), 4)
      assert.equal(collection2.get(1), 5)
      assert.equal(collection2.get(2), 6)
    })
  })

  QUnit.module('Dolphin.Collection.clear', function () {
    QUnit.test('無資料，清除之後長度應等於 0', function (assert) {
      var collection = Dolphin.Collection()
      collection.clear()
      assert.equal(collection.count, 0)
    })

    QUnit.test('加入 1 個項目，清除之後長度應等於 0', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(999)
      collection.clear()
      assert.equal(collection.count, 0)
    })

    QUnit.module('Dolphin.Collection.clone')

    QUnit.test('複製空 List，結果的長度應為 0', function (assert) {
      var collection = Dolphin.Collection().clone()
      assert.equal(collection.count, 0)
    })

    QUnit.test('複製有資料的 List ，結果的內容應相同', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3, 4])
      var collection2 = collection1.clone()
      assert.ok(collection2.equal(collection1))
    })

    QUnit.module('Dolphin.Collection.count')

    QUnit.test('無項目，應回傳 0', function (assert) {
      var collection = Dolphin.Collection()
      assert.equal(collection.count, 0)
    })

    QUnit.test('加入 3 個項目，應回傳 3', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      assert.equal(collection.count, 3)
    })
  })

  QUnit.module('Dolphin.Collection.deleteAt', function () {
    QUnit.test('無項目，刪除應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.deleteAt(0)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('加入 3 個項目然後刪除中間的，應保留原本頭尾的項目', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      collection.deleteAt(1)
      assert.equal(collection.get(0), 1)
      assert.equal(collection.get(1), 3)
    })

    QUnit.test('加入 3 個項目然後刪除第 1 個，應保留後 2 個項目', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      collection.deleteAt(0)
      assert.equal(collection.get(0), 2)
      assert.equal(collection.get(1), 3)
    })

    QUnit.test('加入 3 個項目然後刪除最後 1 個，應保留前 2 個項目', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      collection.deleteAt(2)
      assert.equal(collection.get(0), 1)
      assert.equal(collection.get(1), 2)
    })
  })

  QUnit.module('Dolphin.Collection.difference', function () {
    QUnit.test('[1,2,3] 差集 [2,3,4,5,6]，應回傳[1]', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([2, 3, 4, 5, 6])
      var collection3 = collection1.difference(collection2)

      assert.equal(collection3.count, 1)
      assert.equal(collection3.get(0), 1)
    })

    QUnit.test('[2,3,4,5,6] 差集 [1,2,3] ，應回傳[4,5,6]', function (assert) {
      var collection1 = Dolphin.Collection([2, 3, 4, 5, 6])
      var collection2 = Dolphin.Collection([1, 2, 3])
      var collection3 = collection1.difference(collection2)

      assert.equal(collection3.count, 3)
      assert.equal(collection3.get(0), 4)
      assert.equal(collection3.get(1), 5)
      assert.equal(collection3.get(2), 6)
    })

    QUnit.test('[] 差集 []，應回傳[]', function (assert) {
      var collection1 = Dolphin.Collection([])
      var collection2 = Dolphin.Collection([])
      var collection3 = collection1.difference(collection2)

      assert.equal(collection3.count, 0)
    })
  })

  QUnit.module('Dolphin.Collection.distinct', function () {
    QUnit.test('[1,2,3,3,2,2,2,1,1,4]，應回傳 [1,2,3,4]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3, 3, 2, 2, 2, 1, 1, 4])
      var distinct = collection.distinct()
      assert.equal(distinct.count, 4)
      assert.equal(distinct.get(0), 1)
      assert.equal(distinct.get(1), 2)
      assert.equal(distinct.get(2), 3)
      assert.equal(distinct.get(3), 4)
    })
  })

  QUnit.module('Dolphin.Collection.equal', function () {
    QUnit.test('傳入陣列與 List 之外的物件，應拋出例外 TypeError', function (assert) {
      function testEqual (x) {
        assert.throws(function () {
          collection.equal(x)
        }, function (error) {
          return error instanceof Dolphin.AssertException
        })
      }

      var collection = Dolphin.Collection()
      assert.expect(6)
      testEqual({})
      testEqual(function () {})
      testEqual(1)
      testEqual('')

      assert.throws(function () {
        collection.equal(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })

      assert.throws(function () {
        collection.equal(undefined)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('傳入兩個空 collection，應回傳 true', function (assert) {
      var collection1 = Dolphin.Collection()
      var collection2 = Dolphin.Collection()

      assert.ok(collection1.equal(collection2))
    })

    QUnit.test('傳入兩個相同整數 collection，應回傳 true', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([1, 2, 3])

      assert.ok(collection1.equal(collection2))
    })

    QUnit.test('傳入兩個相同字串 collection，應回傳 true', function (assert) {
      var collection1 = Dolphin.Collection(['a', 'b', 'c'])
      var collection2 = Dolphin.Collection(['a', 'b', 'c'])

      assert.ok(collection1.equal(collection2))
    })

    QUnit.test('傳入兩個相同物件 collection，應回傳 true', function (assert) {
      var collection1 = Dolphin.Collection([{}, {}, {}])
      var collection2 = Dolphin.Collection([{}, {}, {}])

      assert.ok(collection1.equal(collection2))
    })

    QUnit.test('傳入兩個不相同字串 collection，應回傳 false', function (assert) {
      var collection1 = Dolphin.Collection(['a', 'b', 'c'])
      var collection2 = Dolphin.Collection(['a', 'c'])

      assert.notOk(collection1.equal(collection2))
    })

    QUnit.test('傳入物件屬性不同，應回傳 false', function (assert) {
      var collection1 = Dolphin.Collection([{ code: 1 }])
      var collection2 = Dolphin.Collection([{ name: 'a' }])

      assert.notOk(collection1.equal(collection2))
    })
  })

  QUnit.module('Dolphin.Collection.every', function () {
    QUnit.test('callback 傳入非 function ，應拋出例外', function (assert) {
      var collection = Dolphin.Collection([12, 5, 8, 130, 44])
      assert.throws(function () {
        collection.equal({})
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('傳入 [12, 5, 8, 130, 44]，應判斷不是全部都 >= 10', function (assert) {
      function isBigEnough (element, index, array) {
        return element >= 10
      }

      var collection = Dolphin.Collection([12, 5, 8, 130, 44])
      assert.equal(collection.every(isBigEnough), false)
    })

    QUnit.test('傳入 [12, 54, 18, 130, 44]，應判斷全部都 >= 10', function (assert) {
      function isBigEnough (element, index, array) {
        return element >= 10
      }

      var collection = Dolphin.Collection([12, 54, 18, 130, 44])
      assert.equal(collection.every(isBigEnough), true)
    })
  })

  QUnit.module('Dolphin.Collection.exchange', function () {
    QUnit.test('無項目，交換應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.exchange(0, 1)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test(
      '三筆資料交換 -1 與 1 ，應拋出例外 Dolphin.IndexException', function (assert) {
        var collection = Dolphin.Collection()
        collection.add(1)
        collection.add(2)
        collection.add(3)
        assert.throws(function () {
          collection.exchange(-1, 1)
        }, function (error) {
          return error instanceof Dolphin.IndexException
        })
      })

    QUnit.test(
      '三筆資料，交換 3 與 1 ，應拋出例外 Dolphin.IndexException', function (assert) {
        var collection = Dolphin.Collection()
        collection.add(1)
        collection.add(2)
        collection.add(3)
        assert.throws(function () {
          collection.exchange(3, 1)
        }, function (error) {
          return error instanceof Dolphin.IndexException
        })
      })

    QUnit.test('三筆資料交換 0 與 2 ，應交換成功並回傳 List 本身', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      var result = collection.exchange(0, 2)
      assert.equal(collection.get(0), 3)
      assert.equal(collection.get(2), 1)
      assert.equal(result, collection)
    })
  })

  QUnit.module('Dolphin.Collection.fill', function () {
    QUnit.test('[1,2,3,4] 將 0 從 2 填到 4，應回傳 [1,2,0,0]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3, 4]).fill(0, 2, 4)
      assert.ok(Dolphin.Type.deepEqual(collection.toArray(), [1, 2, 0, 0]))
    })

    QUnit.test('[1,2,3,4] 將 5 從 1 填到結束，應回傳 [1,5,5,5]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3, 4]).fill(5, 1)
      assert.ok(Dolphin.Type.deepEqual(collection.toArray(), [1, 5, 5, 5]))
    })

    QUnit.test('[1,2,3,4] 填 6，應回傳 [6,6,6,6]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3, 4]).fill(6)
      assert.ok(Dolphin.Type.deepEqual(collection.toArray(), [6, 6, 6, 6]))
    })
  })

  QUnit.module('Dolphin.Collection.filter', function () {
    QUnit.test('[12, 5, 8, 130, 44] 過濾大於 10 的項目，應回傳 [12,130,44] 的 List',
               function (assert) {
                 function isBigEnough (value) {
                   return value >= 10
                 }

                 var collection = Dolphin.Collection([12, 5, 8, 130, 44])
                 var filtered = collection.filter(isBigEnough)
                 assert.equal(filtered.count, 3)
                 assert.equal(filtered.get(0), 12)
                 assert.equal(filtered.get(1), 130)
                 assert.equal(filtered.get(2), 44)
               })

    QUnit.test(
      '[12, 5, 8, 130, 44] 過濾小於 1 的項目，應回傳 [] 的 List', function (assert) {
        function isSmallEnough (value) {
          return value < 1
        }

        var collection = Dolphin.Collection([12, 5, 8, 130, 44])
        var filtered = collection.filter(isSmallEnough)
        assert.equal(filtered.count, 0)
      })
  })

  QUnit.module('Dolphin.Collection.find', function () {
    QUnit.test('callback 傳入 null，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.find(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('callback 傳入 object，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.find({})
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('無項目，應回傳 undefined', function (assert) {
      function isStringA (item) {
        return item === 'a'
      }

      var collection = Dolphin.Collection()
      assert.equal(collection.find(isStringA), undefined)
    })

    QUnit.test('有資料，應回傳該物件', function (assert) {
      function isStringC (item) {
        return item === 'c'
      }

      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('c')
      assert.equal(collection.find(isStringC), 'c')
    })
  })

  QUnit.module('Dolphin.Collection.findIndex', function () {
    QUnit.test('callback 傳入 null，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.findIndex(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('callback 傳入 object，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.findIndex({})
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('無項目，應回傳 -1', function (assert) {
      function isStringA (item) {
        return item === 'a'
      }

      var collection = Dolphin.Collection()
      assert.equal(collection.findIndex(isStringA), -1)
    })

    QUnit.test('有資料，應回傳該物件索引值', function (assert) {
      function isStringC (item) {
        return item === 'c'
      }

      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('c')
      assert.equal(collection.findIndex(isStringC), 2)
    })
  })

  QUnit.module('Dolphin.Collection.forEach', function () {
    QUnit.test('callback 傳入 null，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.forEach(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('callback 傳入 object，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.forEach({})
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('三筆資料，callback 應呼叫三次', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      assert.expect(3)
      collection.forEach(function (item, index) {
        assert.equal(item, index + 1)
      })
    })
  })

  QUnit.module('Dolphin.Collection.from', function () {
    QUnit.test('從字串產生陣列', function (assert) {
      var collection = Dolphin.Collection().from('foo')
      assert.ok(Dolphin.Type.deepEqual(collection.toArray(), ['f', 'o', 'o']))
    })

    QUnit.test('使用 callback', function (assert) {
      var collection = Dolphin.Collection().from([1, 2, 3], function (x) {
        return x + x
      })
      assert.ok(Dolphin.Type.deepEqual(collection.toArray(), [2, 4, 6]))
    })
  })

  QUnit.module('Dolphin.Collection.get', function () {
    QUnit.test('無項目取位置 1 ，應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.get(1)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('無項目取位置 -1 ，應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.get(-1)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('三筆資料取第四個，應拋出例外', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      assert.throws(function () {
        collection.get(3)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('三筆資料，取每一個應相同', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      assert.equal(collection.get(0), 1)
      assert.equal(collection.get(1), 2)
      assert.equal(collection.get(2), 3)
    })
  })

  QUnit.module('Dolphin.Collection.includes', function () {
    QUnit.test('無項目，應回傳 false', function (assert) {
      var collection = Dolphin.Collection()
      assert.equal(collection.includes(1), false)
    })

    QUnit.test('加入 [1] 並判斷是否擁有 [1]，應回傳 true', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      assert.equal(collection.includes(1), true)
    })

    QUnit.test('判斷 [1] 是否擁有 2 ，應回傳 false', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      assert.equal(collection.includes(2), false)
    })

    QUnit.test('判斷 [a,b,b] 是否擁有 b ，應回傳 true', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('b')
      assert.equal(collection.includes('b'), 1)
    })
  })

  QUnit.module('Dolphin.Collection.indexOf', function () {
    QUnit.test('無項目，應回傳 -1', function (assert) {
      var collection = Dolphin.Collection()
      assert.equal(collection.indexOf('a'), -1)
    })

    QUnit.test('串列內容是 [a] ，傳入 a 應回傳 0', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      assert.equal(collection.indexOf('a'), 0)
    })

    QUnit.test('串列內容是 [a] ，傳入 b 應回傳 -1', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      assert.equal(collection.indexOf('b'), -1)
    })

    QUnit.test('串列內容是 [a,b,b] ，傳入 b 應回傳 1', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('b')
      assert.equal(collection.indexOf('b'), 1)
    })
  })

  QUnit.module('Dolphin.Collection.indexOfItem', function () {
    function simpleObject (index) {
      return {
        code: index
      }
    }

    function complexObject (index) {
      return {
        code: index,
        info: {
          name: index * index
        }
      }
    }

    QUnit.test('加入三個簡單物件，目標位置應是在 1', function (assert) {
      var collection = Dolphin.Collection()
                              .add(simpleObject(1))
                              .add(simpleObject(2))
                              .add(simpleObject(3))

      assert.equal(collection.indexOfItem({ code: 2 }), 1)
    })

    QUnit.test('加入三個簡單物件，尋找不存在的項目應回傳 -1', function (assert) {
      var collection = Dolphin.Collection()
                              .add(simpleObject(1))
                              .add(simpleObject(2))
                              .add(simpleObject(3))

      assert.equal(collection.indexOfItem({ code: 9 }), -1)
    })

    QUnit.test('加入三個複雜物件，目標位置應是在 2', function (assert) {
      var collection = Dolphin.Collection()
                              .add(complexObject(1))
                              .add(complexObject(2))
                              .add(complexObject(3))

      var target = {
        code: 3,
        info: {
          name: 9
        }
      }

      assert.equal(collection.indexOfItem(target), 2)
    })

    QUnit.test('加入二個複雜物件、一個簡單物件，目標位置應是在 1', function (assert) {
      var collection = Dolphin.Collection()
                              .add(complexObject(1))
                              .add(simpleObject(2))
                              .add(complexObject(3))

      var target = {
        code: 2
      }

      assert.equal(collection.indexOfItem(target), 1)
    })

    QUnit.test('加入字串，目標位置應該是在 2', function (assert) {
      var collection = Dolphin.Collection()
                              .add({ name: 'BMW' })
                              .add({ name: 'BENZ' })
                              .add({ name: 'VOLVO' })
                              .add({ name: 'NISSAN' })
      var index = collection.indexOfItem({ name: 'VOLVO' })
      assert.equal(index, 2)
    })

    QUnit.test('加入字串與null，目標位置應該是在 2', function (assert) {
      var collection = Dolphin.Collection()
                              .add(null)
                              .add(null)
                              .add({ name: 'VOLVO' })
                              .add(null)
      var index = collection.indexOfItem({ name: 'VOLVO' })
      assert.equal(index, 2)
    })
  })

  QUnit.module('Dolphin.Collection.insert', function () {
    QUnit.test('串列內容是[1,2,3]，在位置 -1 插入 4，應拋出例外 Dolphin.IndexException',
               function (assert) {
                 var collection = Dolphin.Collection([1, 2, 3])
                 assert.throws(function () {
                   collection.insert(-1, 4)
                 }, function (error) {
                   return error instanceof Dolphin.IndexException
                 })
               })

    QUnit.test('串列內容是[1,2,3]，在位置 3 插入 4，應拋出例外 Dolphin.IndexException',
               function (assert) {
                 var collection = Dolphin.Collection([1, 2, 3])
                 assert.throws(function () {
                   collection.insert(3, 4)
                 }, function (error) {
                   return error instanceof Dolphin.IndexException
                 })
               })

    QUnit.test(
      '串列內容是[]，在位置 0 插入 4，應拋出例外 Dolphin.IndexException', function (assert) {
        var collection = Dolphin.Collection()
        assert.throws(function () {
          collection.insert(0, 4)
        }, function (error) {
          return error instanceof Dolphin.IndexException
        })
      })

    QUnit.test('串列內容是[1,2,3]，在位置 1 插入 4，串列內容應為 [1,4,2,3] 並回傳 List 本身',
               function (assert) {
                 var collection = Dolphin.Collection([1, 2, 3])
                 var result = collection.insert(1, 4)
                 assert.equal(collection.count, 4)
                 assert.equal(collection.get(0), 1)
                 assert.equal(collection.get(1), 4)
                 assert.equal(collection.get(2), 2)
                 assert.equal(collection.get(3), 3)
                 assert.equal(collection, result)
               })
  })

  QUnit.module('Dolphin.Collection.intersection', function () {
    QUnit.test('兩個空 collection，應回傳空 collection', function (assert) {
      var collection1 = Dolphin.Collection()
      var collection2 = Dolphin.Collection()
      var collection3 = collection1.intersection(collection2)

      assert.equal(collection3.count, 0)
    })

    QUnit.test('[1,2,3] 交集 [3,4,5,6]，應回傳 [3]', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([3, 4, 5, 6])
      var collection3 = collection1.intersection(collection2)

      assert.equal(collection3.count, 1)
      assert.equal(collection3.get(0), 3)
    })

    QUnit.test('[1,2,3] 交集 [2,3,4,5,6]，應回傳 [2,3]', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([2, 3, 4, 5, 6])
      var collection3 = collection1.intersection(collection2)

      assert.equal(collection3.count, 2)
      assert.equal(collection3.get(0), 2)
      assert.equal(collection3.get(1), 3)
    })
  })

  QUnit.module('Dolphin.Collection.map', function () {
    QUnit.test('callback 傳入 null，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.map(null)
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('callback 傳入 object，應拋出 TypeError', function (assert) {
      assert.throws(function () {
        var collection = Dolphin.Collection()
        collection.map({})
      }, function (error) {
        return error instanceof Dolphin.AssertException
      })
    })

    QUnit.test('[1, 4, 9, 16] 每一個項目 * 2，應回傳 [2, 8, 18, 32]', function (assert) {
      var collection = Dolphin.Collection([1, 4, 9, 16])
      var result = collection.map(function (x) {
        return x * 2
      })

      assert.equal(result.count, 4)
      assert.equal(result.get(0), 2)
      assert.equal(result.get(1), 8)
      assert.equal(result.get(2), 18)
      assert.equal(result.get(3), 32)
    })

    QUnit.test('物件屬性轉換，應能正確轉換', function (assert) {
      function createObject (index) {
        return {
          code: index,
          name: index
        }
      }

      var collection = Dolphin.Collection()
                              .add(createObject(1))
                              .add(createObject(2))
                              .add(createObject(3))
                              .add(createObject(4))

      var result = collection.map(function (x) {
        return {
          index: x.code,
          code: x.code * 2
        }
      })

      function createObject2 (index) {
        return {
          index: index,
          code: index * 2
        }
      }

      var expected = Dolphin.Collection()
                            .add(createObject2(1))
                            .add(createObject2(2))
                            .add(createObject2(3))
                            .add(createObject2(4))

      assert.ok(result.equal(expected))
    })
  })

  QUnit.module('Dolphin.Collection.move', function () {
    QUnit.test(
      '將串列 [1,2,3] 位置 2 項目移到 0 ，串列應改為 [3,1,2] 並回傳串列本身', function (assert) {
        var collection = Dolphin.Collection([1, 2, 3])
        var result = collection.move(2, 0)
        assert.equal(collection.count, 3)
        assert.equal(collection.get(0), 3)
        assert.equal(collection.get(1), 1)
        assert.equal(collection.get(2), 2)
        assert.equal(collection, result)
      })

    QUnit.test(
      '將串列 [1,2,3] 位置 1 項目移到 2 ，串列應改為 [1,3,2] 並回傳串列本身', function (assert) {
        var collection = Dolphin.Collection([1, 2, 3])
        var result = collection.move(1, 2)
        assert.equal(collection.count, 3)
        assert.equal(collection.get(0), 1)
        assert.equal(collection.get(1), 3)
        assert.equal(collection.get(2), 2)
        assert.equal(collection, result)
      })

    QUnit.test('將串列 [1,2,3] 位置 -1 項目移到 -2 ，串列應改為 [1,3,2] 並回傳串列本身',
               function (assert) {
                 var collection = Dolphin.Collection([1, 2, 3])
                 var result = collection.move(-1, -2)
                 assert.equal(collection.count, 3)
                 assert.equal(collection.get(0), 1)
                 assert.equal(collection.get(1), 3)
                 assert.equal(collection.get(2), 2)
                 assert.equal(collection, result)
               })
  })

  QUnit.module('Dolphin.Collection.put', function () {
    QUnit.test('無項目，放位置 1 應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.put(1)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('無項目，放位置 -1 應拋出例外 Dolphin.IndexException', function (assert) {
      var collection = Dolphin.Collection()
      assert.throws(function () {
        collection.put(-1)
      }, function (error) {
        return error instanceof Dolphin.IndexException
      })
    })

    QUnit.test('串列 [1,2,3] 把 [4] 放到位置 2，串列應改為 [1,2,4]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3]).put(2, 4)
      assert.ok(collection.equal(Dolphin.Collection([1, 2, 4])))
    })
  })

  QUnit.module('Dolphin.Collection.reduce', function () {
    QUnit.test('[0, 1, 2, 3] 累加應回傳 6', function (assert) {
      var collection = Dolphin.Collection([0, 1, 2, 3])
      var sum = collection.reduce(function (a, b) {
        return a + b
      }, 0)

      assert.equal(sum, 6)
    })

    QUnit.test(
      '攤平 [[0, 1], [2, 3], [4, 5]] 應傳回 [0, 1, 2, 3, 4, 5]', function (assert) {
        var collection = Dolphin.Collection([[0, 1], [2, 3], [4, 5]])
        var flattened = collection.reduce(function (a, b) {
          return a.concat(b)
        }, [])
        assert.ok(flattened.equal(Dolphin.Collection([0, 1, 2, 3, 4, 5])))
      })

    QUnit.test('計算相同元素數量並以物件鍵值顯示', function (assert) {
      var collection = Dolphin.Collection([[0, 1], [2, 3], [4, 5]])
      var flattened = collection.reduce(function (a, b) {
        return a.concat(b)
      }, [])
      assert.ok(flattened.equal(Dolphin.Collection([0, 1, 2, 3, 4, 5])))

      var names = Dolphin.Collection(['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'])
      var countedNames = names.reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++
        } else {
          allNames[name] = 1
        }
        return allNames
      }, {})

      assert.ok(Dolphin.Type.deepEqual(countedNames, {
        Alice: 2,
        Bob: 1,
        Tiff: 1,
        Bruce: 1
      }))
    })

    QUnit.test('移除陣列中的重複項目', function (assert) {
      var arr = Dolphin.Collection([1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4])
      var result = arr.sort().reduce(function (init, current) {
        if (init.length === 0 || init[init.length - 1] !== current) {
          init.push(current)
        }
        return init
      }, [])

      assert.ok(Dolphin.Type.deepEqual(result.toArray(), [1, 2, 3, 4, 5]))
    })
  })

  QUnit.module('Dolphin.Collection.remove', function () {
    QUnit.test('無項目，移除資料 a ，應回傳 false', function (assert) {
      var collection = Dolphin.Collection()
      assert.equal(collection.remove('a'), false)
    })

    QUnit.test('[a,b,c] 移除資料 d ，應回傳 false', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('c')
      assert.equal(collection.remove('d'), false)
      assert.equal(collection.count, 3)
    })

    QUnit.test('串列 [a] 移除資料 a ，應回傳 true', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      assert.equal(collection.remove('a'), true)
      assert.equal(collection.count, 0)
    })

    QUnit.test('[a,b,c] 移除資料 a ，應回傳 true', function (assert) {
      var collection = Dolphin.Collection()
      collection.add('a')
      collection.add('b')
      collection.add('c')
      assert.equal(collection.remove('b'), true)
      assert.equal(collection.count, 2)
    })
  })

  QUnit.module('Dolphin.Collection.reverse', function () {
    QUnit.test('[1,2, 3] => [3,2,1]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3])
      collection.reverse()
      assert.equal(collection.count, 3)
      assert.equal(collection.get(0), 3)
      assert.equal(collection.get(1), 2)
      assert.equal(collection.get(2), 1)
    })
  })

  QUnit.module('Dolphin.Collection.sort', function () {
    QUnit.test('[3,2,1] 按升冪排序，應改為 [1,2,3]', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(3)
      collection.add(2)
      collection.add(1)
      collection.sort(function (a, b) {
        if (a < b) {
          return -1
        } else if (a > b) {
          return 1
        } else {
          return 0
        }
      })

      assert.equal(collection.get(0), 1)
      assert.equal(collection.get(1), 2)
      assert.equal(collection.get(2), 3)
    })

    QUnit.test('\'[1,2,3] 按降冪排序，應改為 [3,2,1]', function (assert) {
      var collection = Dolphin.Collection()
      collection.add(1)
      collection.add(2)
      collection.add(3)
      collection.sort(function (a, b) {
        if (a < b) {
          return 1
        } else if (a > b) {
          return -1
        } else {
          return 0
        }
      })

      assert.equal(collection.get(0), 3)
      assert.equal(collection.get(1), 2)
      assert.equal(collection.get(2), 1)
    })
  })

  QUnit.module('Dolphin.Collection.subset', function () {
    QUnit.test('[1,2] 是 [1,2,3] 的子集合', function (assert) {
      var collection1 = Dolphin.Collection([1, 2])
      var collection2 = Dolphin.Collection([1, 2, 3])
      assert.ok(collection1.subset(collection2))
    })

    QUnit.test('[1,2,3] 不是 [1,2] 的子集合', function (assert) {
      var collection1 = Dolphin.Collection([1, 2, 3])
      var collection2 = Dolphin.Collection([1, 2])
      assert.notOk(collection1.subset(collection2))
    })
  })

  QUnit.module('Dolphin.Collection.toArray', function () {
    QUnit.test('[1,2,3] 按升冪排序，應回傳陣列 [1,2,3]', function (assert) {
      var collection = Dolphin.Collection([1, 2, 3])
      var result = collection.toArray()
      assert.ok(Dolphin.Type.isArray(result))
      assert.equal(result.length, 3)
    })
  })

  QUnit.module('Dolphin.Collection.union', function () {
    QUnit.test('兩個空 collection，應回傳空', function (assert) {
      var collection1 = Dolphin.Collection()
      var collection2 = Dolphin.Collection()
      var collection3 = collection1.union(collection2)

      assert.equal(collection3.count, 0)
    })

    QUnit.test('兩個不同 collection，應回傳兩個collection的內容', function (assert) {
      var collection1 = Dolphin.Collection([1, 3, 5, 5])
      var collection2 = Dolphin.Collection([2, 4, 4, 6])
      var collection3 = collection1.union(collection2)

      assert.equal(collection3.count, 6)
      assert.equal(collection3.get(0), 1)
      assert.equal(collection3.get(1), 3)
      assert.equal(collection3.get(2), 5)
      assert.equal(collection3.get(3), 2)
      assert.equal(collection3.get(4), 4)
      assert.equal(collection3.get(5), 6)
    })

    QUnit.test('兩個collection其中一個為空，應回傳第一個collection的內容', function (assert) {
      var collection1 = Dolphin.Collection([1, 3, 5])
      var collection2 = Dolphin.Collection([])
      var collection3 = collection1.union(collection2)

      assert.equal(collection3.count, 3)
      assert.equal(collection3.get(0), 1)
      assert.equal(collection3.get(1), 3)
      assert.equal(collection3.get(2), 5)
    })

    QUnit.test('兩個collection其中一個為空，應回傳第一個collection的內容', function (assert) {
      var collection1 = Dolphin.Collection([])
      var collection2 = Dolphin.Collection([1, 3, 5])
      var collection3 = collection1.union(collection2)

      assert.equal(collection3.count, 3)
      assert.equal(collection3.get(0), 1)
      assert.equal(collection3.get(1), 3)
      assert.equal(collection3.get(2), 5)
    })
  })
})
