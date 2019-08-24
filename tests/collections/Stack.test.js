QUnit.module('Dolphin.Stack', function () {
  QUnit.module('constructor', function () {
    QUnit.test('呼叫建構子，應建立物件', function (assert) {
      var stack = new Dolphin.Stack()
      assert.equal(typeof stack, 'object')
    })
  })

  QUnit.module('Dolphin.Stack.clear', function () {
    QUnit.test('無項目，數量應回傳 0', function (assert) {
      var stack = new Dolphin.Stack()
      stack.clear()
      assert.equal(stack.count, 0)
    })

    QUnit.test('加入 1 個項目，數量應回傳 0', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push(1)
      stack.clear()
      assert.equal(stack.count, 0)
    })
  })

  QUnit.module('Dolphin.Stack.count', function () {
    QUnit.test('無項目，應回傳 0', function (assert) {
      var stack = new Dolphin.Stack()
      assert.equal(stack.count, 0)
    })

    QUnit.test('加入 1 個項目，應回傳 1', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push(1)
      assert.equal(stack.count, 1)
    })
  })

  QUnit.module('Dolphin.Stack.pop', function () {
    QUnit.test('無項目，應拋出例外 Dolphin.StackUnderflowException', function (assert) {
      var stack = new Dolphin.Stack()
      assert.throws(
        function () {
          stack.pop()
        },
        function (error) {
          return error instanceof Dolphin.StackUnderflowException
        }
      )
    })

    QUnit.test('推入 1 個資料，取出的資料應該相同', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push(1234)
      assert.equal(stack.pop(), 1234)
    })

    QUnit.test('推入 1 個資料，數量應為 1', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push(1234)
      assert.equal(stack.count, 1)
    })
  })

  QUnit.module('Dolphin.Stack.push', function () {
    QUnit.test('無參數，應加入 1 個 undefined 項目', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push()
      assert.equal(stack.peek(), undefined)
    })

    QUnit.test('推入 1 個項目，數量應為 1', function (assert) {
      var stack = new Dolphin.Stack()
      stack.push(1)
      assert.equal(stack.count, 1)
    })

    QUnit.test('使用方法鏈推入 3 個項目，數量應為 3', function (assert) {
      var stack = new Dolphin.Stack()
      stack
        .push(1)
        .push(2)
        .push(3)
      assert.equal(stack.count, 3)
    })
  })
})
