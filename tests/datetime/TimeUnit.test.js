QUnit.module('Dolphin.DateTime.TimeUnit', function () {
  QUnit.test('1 Day 應該等於 86400000 毫秒', function (assert) {
    var msec = Dolphin.TimeUnit.fromDay(1)
    assert.equal(msec, 86400000)
  })

  QUnit.test('86400000 毫秒應該等於 1 Day', function (assert) {
    var day = Dolphin.TimeUnit.toDay(86400000)
    assert.equal(day, 1)
  })

  QUnit.test('1 Hour 應該等於 3600000 毫秒', function (assert) {
    var msec = Dolphin.TimeUnit.fromHour(1)
    assert.equal(msec, 3600000)
  })

  QUnit.test('3600000 毫秒應該等於 1 Hour', function (assert) {
    var hour = Dolphin.TimeUnit.toHour(3600000)
    assert.equal(hour, 1)
  })

  QUnit.test('1 Minute 應該等於 60000 毫秒', function (assert) {
    var msec = Dolphin.TimeUnit.fromMinute(1)
    assert.equal(msec, 60000)
  })

  QUnit.test('60000 毫秒應該等於 1 Minute', function (assert) {
    var minute = Dolphin.TimeUnit.toMinute(60000)
    assert.equal(minute, 1)
  })

  QUnit.test('1 Second 應該等於 1000 毫秒', function (assert) {
    var msec = Dolphin.TimeUnit.fromSecond(1)
    assert.equal(msec, 1000)
  })

  QUnit.test('1000 毫秒應該等於 1 Minute', function (assert) {
    var second = Dolphin.TimeUnit.toSecond(1000)
    assert.equal(second, 1)
  })
})
