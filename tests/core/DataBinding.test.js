QUnit.module('Dolphin.DataBinding', function () {
  var Type = Dolphin.Type
  var DataBinding = Dolphin.DataBinding;
  if (window.fixture) {
    fixture.setBase('tests/fixtures')
    fixture.load('DataBinding.fixture.html')
  }

  QUnit.test('改變物件屬性，HTML 元素的值會改變', function (assert) {
    var obj = { a: 123 }
    var myInputElement1 = document.getElementById('myText1')
    var myInputElement2 = document.getElementById('myText2')
    var myDOMElement = document.getElementById('myDomElement')

    new DataBinding(obj, 'a')
      .attach(myInputElement1, 'value', 'keyup')
      .attach(myInputElement2, 'innerHTML')
      .attach(myDOMElement, 'innerHTML')

    obj.a = 456

    assert.equal(myInputElement1.value, '456')
  })
})
