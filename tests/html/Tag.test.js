QUnit.module('Dolphin.Html', function () {
  QUnit.module('constructor', function () {
    QUnit.test('所有 tag 應能建立', function (assert) {
      var Type = Dolphin.Type
      Dolphin.Html.Tags.forEach(function (tag) {
        var e = Dolphin.Html[tag]()
        var expected = '<' + tag + '>' + '</' + tag + '>'
        assert.ok(Type.isNotNullOrUndefined(e))
        assert.equal(e.outerHTML(), expected.toLowerCase())
      })
    })
  })
})
