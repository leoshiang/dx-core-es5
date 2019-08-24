QUnit.module('Dolphin.Observable', function () {
  QUnit.module('Observe', function () {
    QUnit.test('觀察物件個別屬性，有異動時應該個別被通知', function (assert) {
      var data = {
        text: '',
        id: ''
      }

      var done = assert.async(2)

      Dolphin.Observable(data)
             .watch('text', function (channel, event) {
               done()
             })
             .watch('id', function (channel, event) {
               done()
             })

      data.text = 'Button1'
      data.id = '#12'
      assert.ok(true)
    })

    QUnit.test('觀察物件全部屬性，任一屬性有異動時應該被通知', function (assert) {
      var data = {
        text: '',
        id: ''
      }

      var done = assert.async(2)

      Dolphin.Observable(data).watch('*', function (channel, event) {
        done()
      })

      data.text = 'Button1'
      data.id = '#12'
      assert.ok(true)
    })
  })
})
