QUnit.module('Namespace', function () {
  QUnit.test('定義空 namespace', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('').tools = {}
    assert.equal(typeof testNamespace.tools, 'object')
  })

  QUnit.test('namespace 中間有空白', function (assert) {
    var testNamespace = new Namespace()
    try {
      testNamespace.namespace('a. .c').tools = {}
    } catch (e) {
      assert.ok(e instanceof Error)
    }
  })

  QUnit.test('namespace 前後有空白', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace(' a. b .c ').tools = {}
    assert.equal(typeof testNamespace.a.b.c.tools, 'object')
  })

  QUnit.test('定義空物件', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('test').tools = {}
    assert.equal(typeof testNamespace.test.tools, 'object')
  })

  QUnit.test('定義函式並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('System.Math').Add = function (a, b) {
      return a + b
    }
    var result = testNamespace.System.Math.Add(1, 2)
    assert.equal(result, 3)
  })

  QUnit.test('函式 namespace 有被定義', function (assert) {
    var testNamespace = new Namespace()
    assert.equal(typeof testNamespace.namespace, 'function')
  })

  QUnit.test('中文-定義空 namespace', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('').工具 = {}
    assert.equal(typeof testNamespace.工具, 'object')
  })

  QUnit.test('中文-namespace 中間有空白', function (assert) {
    var testNamespace = new Namespace()
    try {
      testNamespace.namespace('海豚. .系統').工具 = {}
    } catch (e) {
      assert.ok(e instanceof Error)
    }
  })

  QUnit.test('中文-namespace 前後有空白', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace(' 海豚. 核心 .系統 ').工具 = {}
    assert.equal(typeof testNamespace.海豚.核心.系統.工具, 'object')
  })

  QUnit.test('中文-定義空物件', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('海豚.核心.系統').空物件 = {}
    assert.equal(typeof testNamespace.海豚.核心.系統.空物件, 'object')
  })

  QUnit.test('中文-定義函式並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('海豚.數學').相加 = function (a, b) {
      return a + b
    }
    var result = testNamespace.海豚.數學.相加(1, 2)
    assert.equal(result, 3)
  })

  QUnit.test('函式 reflection 有被定義', function (assert) {
    var testNamespace = new Namespace()
    assert.equal(typeof testNamespace.reflection, 'function')
  })

  QUnit.test('定義函式，透過反射取得並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('System.Math').Add = function (a, b) {
      return a + b
    }
    var add = testNamespace.reflection('System.Math.Add')
    var result = add(1, 2)
    assert.equal(result, 3)
  })

  QUnit.test('函式定義在命名空間根節點，透過反射取得並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('').Add = function (a, b) {
      return a + b
    }
    var result = testNamespace.reflection('Add')(1, 2)
    assert.equal(result, 3)
  })

  QUnit.test('中文-定義函式，透過反射取得並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('海豚.數學').相加 = function (a, b) {
      return a + b
    }
    var result = testNamespace.reflection('海豚.數學.相加')(1, 2)
    assert.equal(result, 3)
  })

  QUnit.test('中文-函式定義在命名空間根節點，透過反射取得並呼叫', function (assert) {
    var testNamespace = new Namespace()
    testNamespace.namespace('').相加 = function (a, b) {
      return a + b
    }
    var result = testNamespace.reflection('相加')(1, 2)
    assert.equal(result, 3)
  })
})
