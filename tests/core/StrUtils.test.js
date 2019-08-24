QUnit.module('Dolphin.StrUtils', function () {
  var StrUtils = Dolphin.StrUtils

  QUnit.module('repeat', function () {
    QUnit.test('沒有參數，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.repeat()
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('count < 0，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.repeat('a', -1)
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('單一字元重複 0 次，應回傳空字串', function (assert) {
      var result = StrUtils.repeat('a', 0)
      assert.equal(result, '')
    })

    QUnit.test('單一字元重複3次，應回傳3個字元', function (assert) {
      var result = StrUtils.repeat('a', 3)
      assert.equal(result, 'aaa')
    })

    QUnit.test('三個字元重複 0 次，應回傳空字串', function (assert) {
      var result = StrUtils.repeat('aaa', 0)
      assert.equal(result, '')
    })

    QUnit.test('三個字元重複3次，應回傳9個字元', function (assert) {
      var result = StrUtils.repeat('aaa', 3)
      assert.equal(result, 'aaaaaaaaa')
    })
  })

  QUnit.module('format', function () {
    QUnit.test('沒有參數，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format()
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('有參數沒有值，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format('{1}')
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('參數比值多，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format('{1}{2}{3}', 1, 2)
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('參數比值少，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format('{1}', 1, 2)
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('沒有參數有值，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format('', 'test')
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('參數編號亂跳，應能正確取代變數', function (assert) {
      assert.equal(StrUtils.format('{3}{2}{1}', 1, 2, 3), '321')
    })

    QUnit.test('參數編號大於值的數目，應拋出 InvalidArgument 例外', function (assert) {
      assert.throws(function () {
        StrUtils.format('{4}{5}{6}', 1, 2, 3)
      }, function (error) {
        return error instanceof Dolphin.ArgumentException
      })
    })

    QUnit.test('值為 null，應可取代變數', function (assert) {
      assert.equal(
        StrUtils.format('{1}{2}{3}', null, null, null), 'nullnullnull')
    })

    QUnit.test('數字參數，應可取代變數', function (assert) {
      assert.equal(StrUtils.format('{1}{2}{3}', 1, 2, 3), '123')
    })

    QUnit.test('文字參數，應可取代變數', function (assert) {
      assert.equal(StrUtils.format('{1}{2}{3}', 'A', 'B', 'C'), 'ABC')
    })
  })
})
