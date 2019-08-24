QUnit.module('Dolphin.Bits', function () {
  QUnit.module('constructor', function () {
    QUnit.test('未指定長度，長度應該等於 0', function (assert) {
      var bits = Dolphin.Bits()
      assert.equal(bits.length, 0)
    })

    QUnit.test('傳入非數值的長度，長度應該等於 0', function (assert) {
      var bits = Dolphin.Bits('a')
      assert.equal(bits.length, 0)
    })

    QUnit.test('傳入 33，長度應該等於 33', function (assert) {
      var bits = Dolphin.Bits(33)
      assert.equal(bits.length, 33)
    })
  })

  QUnit.module('setLength', function () {
    QUnit.test('指定長度 33，長度應該等於 33', function (assert) {
      var bits = Dolphin.Bits()
      bits.length = 33
      assert.equal(bits.length, 33)
    })

    QUnit.test('指定非數值的長度，長度應該不變', function (assert) {
      var bits = Dolphin.Bits()
      bits.length = 33
      bits.length = 'a'
      assert.equal(bits.length, 33)
    })

    QUnit.test('指定長度 65 之後指定長度 33，長度應等於 33', function (assert) {
      var bits = Dolphin.Bits()
      bits.length = 65
      bits.length = 33
      assert.equal(bits.length, 33)
    })
  })

  QUnit.module('fromInt32', function () {
    QUnit.test('指定 0xaaaaaaaa ，長度應該等於 32', function (assert) {
      var bits = Dolphin.Bits()
      bits.fromInt32(0xaaaaaaaa)
      assert.equal(bits.length, 32)
    })

    QUnit.test('指定 0xaaaaaaaa ，奇數位元應等於 1', function (assert) {
      var bits = Dolphin.Bits()
      bits.fromInt32(0xaaaaaaaa)
      bits.forEach(function (index, value) {
        assert.equal(value | 0, index % 2)
      })
    })
  })

  QUnit.module('set', function () {
    QUnit.test('set 指定長度 128 偶數位元設為 1，偶數位元應等於 1', function (assert) {
      var bits = Dolphin.Bits(128)
      for (var i = 0; i <= 127; i++) {
        bits.set(i, i % 2 !== 0)
      }

      for (var j = 0; j <= 127; j++) {
        assert.equal(bits.isOn(j) | 0, j % 2)
      }
    })
  })
})
