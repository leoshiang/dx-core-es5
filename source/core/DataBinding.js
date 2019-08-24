/* global Dolphin */
Dolphin.DataBinding = function (obj, property) {
  // ---- private -----------------------------------------
  var bindings = []
  var value = obj[property]

  function valueGetter () {
    return value
  }

  function valueSetter (newValue) {
    value = newValue
    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i]
      binding.element[binding.attribute] = newValue
    }
  }

  Object.defineProperty(obj, property, {
    get: valueGetter,
    set: valueSetter
  })

  function attach (element, attribute, event) {
    Dolphin.Assert.isNotNull(element)
    var binding = {
      element: element,
      attribute: attribute
    }

    if (event) {
      element.addEventListener(event, function () {
        valueSetter(element[attribute])
      })
      binding.event = event
    }

    bindings.push(binding)
    element[attribute] = value

    return this
  }

  // ---- export ------------------------------------------
  return {
    attach: attach
  }
}
