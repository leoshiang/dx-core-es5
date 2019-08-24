QUnit.module('Dolphin.DateTime.Period', function () {
  QUnit.module('constructor', function () {
    QUnit.test('不傳入參數，應能建立物件', function (assert) {
      var period = new Dolphin.Period()
      assert.ok(Dolphin.Type.isNotNullOrUndefined(period))
    })
  })
})
