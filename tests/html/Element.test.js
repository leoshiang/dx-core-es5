QUnit.module('Dolphin.Html.Element', function () {
  var Element = Dolphin.Html.Element
  var Type = Dolphin.Type

  QUnit.module('constructor', function () {
    QUnit.test('不傳入任何參數，應該建立 Element', function (assert) {
      var e = new Element()

      assert.ok(Type.isNotNullOrUndefined(e))
    })

    QUnit.test('傳入三個物件，子物件數目應該等於三', function (assert) {
      var e = new Element(new Element(), new Element(), new Element())

      assert.equal(e.childElementCount(), 3)
    })

    QUnit.test('傳入有效物件，應加入子物件', function (assert) {
      var e = new Element('test', 1, {})

      assert.equal(e.childElementCount(), 3)
    })
  })

  QUnit.module('closingTag', function () {
    QUnit.test('設定 closingTag，outerHtml 應該包含開始和結束TAG', function (assert) {
      var e = new Element()
      e.tag = 'AA'

      assert.equal(e.outerHTML(), '<AA></AA>')
    })

    QUnit.test('closingTag = false，outerHtml 應該只有開始TAG', function (assert) {
      var e = new Element()
      e.closingTag = false
      e.tag = 'AA'

      assert.equal(e.outerHTML(), '<AA>')
    })
  })

  QUnit.module('add', function () {
    QUnit.test('傳入有效物件，應該加入子物件', function (assert) {
      var e = new Element().add(new Element())

      assert.equal(e.childElementCount(), 1)
    })

    QUnit.test('傳入無效物件，不應該加入子物件', function (assert) {
      var e = new Element()
      e.add(null).add(undefined)

      assert.equal(e.childElementCount(), 0)
    })
  })

  QUnit.module('childElementCount', function () {
    QUnit.test('加入有效物件，應該回傳正確數目', function (assert) {
      var e = new Element().add(new Element())

      assert.equal(e.childElementCount(), 1)
    })

    QUnit.test('移除子物件，數量應該減一', function (assert) {
      var c = new Element()
      var e = new Element(c).remove(c)

      assert.equal(e.childElementCount(), 0)
    })
  })

  QUnit.module('has', function () {
    QUnit.test('加入有效物件，應該回傳該物件存在', function (assert) {
      var c = new Element()
      var e = new Element(c)

      assert.ok(e.has(c))
    })
  })

  QUnit.module('remove', function () {
    QUnit.test('加入物件再移除，子物件數量應該不變', function (assert) {
      var c = new Element()
      var e = new Element()
      e.add(c).remove(c)

      assert.equal(e.childElementCount(), 0)
    })
  })

  QUnit.module('attr', function () {
    QUnit.test('沒有傳入參數，應該回傳所有屬性值', function (assert) {
      var c = new Element().attr('id', 'test-button').attr('name', 'test-button-name')
      var expected = ' id="test-button" name="test-button-name"'

      assert.equal(c.attr(), expected)
    })

    QUnit.test('只傳入一個參數 "-"，應清除屬性值', function (assert) {
      var c = new Element()
        .attr('id', 'test-button')
        .attr('name', 'test-button-name')
        .attr('-')

      assert.equal(c.attr(), '')
    })

    QUnit.test('傳入一個參數，應回傳屬性值', function (assert) {
      var expected = 'test'
      var c = new Element().attr('id', expected)

      assert.equal(c.attr('id'), expected)
    })

    QUnit.test('傳入兩個參數，應設定屬性值', function (assert) {
      var expected = 'submit-button'
      var c = new Element().attr('name', expected)

      assert.equal(c.attr('name'), expected)
    })

    QUnit.test('傳入兩個參數，第二個參數無效，應拋出例外', function (assert) {
      assert.throws(function () {
        new Element().attr('name', null)
      }, '參數應為兩個，或是第二個參數無效')
    })

    QUnit.test('傳入一個以上的 class，應能分解', function (assert) {
      var e = new Element().attr('class', 'class-a class-b')
      var expected = 'class-a class-b'
      var actual = e.attr('class')

      assert.equal(actual, expected)
    })

    QUnit.test('傳入一個以上的 style，應能分解', function (assert) {
      var e = new Element().attr('style', 'style-a style-b')
      var expected = 'style-a style-b'

      assert.equal(e.attr('style'), expected)
    })
  })

  QUnit.module('attrs', function () {
    QUnit.test('傳入參數物件，應該能設定所有屬性值', function (assert) {
      var attrs = {
        id: 'test-button',
        name: 'test-button-name'
      }
      var c = new Element().attrs(attrs)
      var expected = ' id="test-button" name="test-button-name"'
      assert.equal(c.attr(), expected)
    })
  })

  QUnit.module('css', function () {
    QUnit.test('不傳入參數，應該回傳 class 內容', function (assert) {
      var e = new Element().css('class-a').css('class-b')
      var expected = 'class-a class-b'

      assert.equal(e.css(), expected)
    })

    QUnit.test('傳入單一參數，應該加入 class', function (assert) {
      var e = new Element().css('class-a').css('class-b')
      var expected = 'class-a class-b'

      assert.equal(e.attr('class'), expected)
    })

    QUnit.test('傳入兩個參數，第一個是"-"，應該移除 class', function (assert) {
      var e = new Element()
        .css('class-a')
        .css('class-b')
        .css('-', 'class-a')
      var expected = 'class-b'

      assert.equal(e.attr('class'), expected)
    })

    QUnit.test('傳入兩個參數，第一個不是"-"，應該拋出例外', function (assert) {
      assert.throws(function () {
        new Element().css('*', 'class-a')
      }, '無效的參數: *')
    })

    QUnit.test('傳入三個參數，應該拋出例外', function (assert) {
      assert.throws(function () {
        new Element().css('*', 'class-a', 'class-b')
      }, '參數數量不正確')
    })
  })

  QUnit.module('style', function () {
    QUnit.test('不傳入參數，應該回傳 style 內容', function (assert) {
      var e = new Element().style('style-a').style('style-b')
      var expected = 'style-a;style-b'
      var actual = e.style()

      assert.equal(actual, expected)
    })

    QUnit.test('傳入單一參數，應該加入 style', function (assert) {
      var e = new Element().style('style-a').style('style-b')
      var expected = 'style-a;style-b'

      assert.equal(e.attr('style'), expected)
    })

    QUnit.test('傳入兩個參數，第一個是"-"，應該移除 style', function (assert) {
      var e = new Element()
        .style('style-a')
        .style('style-b')
        .style('-', 'style-a')
      var expected = 'style-b'

      assert.equal(e.attr('style'), expected)
    })

    QUnit.test('傳入兩個參數，第一個不是"-"，應該拋出例外', function (assert) {
      assert.throws(function () {
        new Element().style('*', 'style-a')
      }, '無效的參數: *')
    })

    QUnit.test('傳入三個參數，應該拋出例外', function (assert) {
      assert.throws(function () {
        new Element().style('*', 'style-a', 'style-b')
      }, '參數數量不正確')
    })
  })

  QUnit.module('attributeHTML', function () {
    QUnit.test('沒有 class、style，應回傳所有屬性的集合', function (assert) {
      var e = new Element().attr('id', 'test-id').attr('name', 'test-name')
      var expected = ' id="test-id" name="test-name"'

      assert.equal(e.attributeHTML(), expected)
    })

    QUnit.test('有 class、style，應回傳包含 class、style 所有屬性的集合', function (assert) {
      var e = new Element()
        .attr('id', 'test-id')
        .attr('name', 'test-name')
        .css('class-a')
        .css('class-b')
        .style('style-a')
        .style('style-b')
      var expected =
        ' id="test-id" name="test-name" class="class-a class-b" style="style-a;style-b"'

      assert.equal(e.attributeHTML(), expected)
    })
  })

  QUnit.module('innerHTML', function () {
    QUnit.test('沒有子物件，應回傳空字串', function (assert) {
      var e = new Element()

      assert.equal(e.innerHTML(), '')
    })

    QUnit.test('子物件中有 html 元素，應回傳所有子物件 outerHTML 的字串集合', function (assert) {
      var c = new Element().attr('id', 'test-id').attr('name', 'test-name')
      c.tag = 'AA'
      var e = new Element('a', 'b', 'c', c)

      assert.equal(e.innerHTML(), 'abc<AA id="test-id" name="test-name"></AA>')
    })
  })

  QUnit.module('outerHTML', function () {
    QUnit.test('沒有子物件和屬性，應回傳空的TAG', function (assert) {
      var e = new Element()
      e.tag = 'AA'

      assert.equal(e.outerHTML(), '<AA></AA>')
    })

    QUnit.test('沒有子物件、有屬性，應回傳包含屬性的TAG', function (assert) {
      var e = new Element()
        .css('class-a')
        .css('class-b')
        .style('style-a')
        .style('style-b')
      e.tag = 'AA'
      var expected = '<AA class="class-a class-b" style="style-a;style-b"></AA>'

      assert.equal(e.outerHTML(), expected)
    })

    QUnit.test('有子物件、有屬性，應回傳包含屬性的TAG', function (assert) {
      var c = new Element()
        .css('class-c')
        .css('class-d')
        .style('style-c')
        .style('style-d')

      c.tag = 'BB'

      var e = new Element(c)
        .css('class-a')
        .css('class-b')
        .style('style-a')
        .style('style-b')
      e.tag = 'AA'

      var expected =
        '<AA class="class-a class-b" style="style-a;style-b">' +
        '<BB class="class-c class-d" style="style-c;style-d"></BB>' +
        '</AA>'

      assert.equal(e.outerHTML(), expected)
    })
  })
})
