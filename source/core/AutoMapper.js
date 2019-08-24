/* global Dolphin */
Dolphin.AutoMapper = function () {
  // ---- import ------------------------------------------
  var Assert = Dolphin.Assert
  var Type = Dolphin.Type
  var Types = Dolphin.Types

  // ---- private -----------------------------------------
  var profiles = {}

  function getKey (source) {
    var result = Type.isFunction(source) ? source.name : source
    Assert.isNotEmptyString(result, 'getKey 的結果不可以為空字串')

    return result
  }

  function buildProfileKey (source, target) {
    return getKey(source) + '->' + getKey(target)
  }

  function createMap (source, target) {
    var profileKey = buildProfileKey(source, target)
    profiles[profileKey] = {}
    var func = {
      forMember: function (property, any) {
        Assert.isNotEmptyString(property, '參數 property 必須有值')
        var profile = profiles[profileKey]
        Assert.isNotNullOrUndefined(profile)
        profile[property] = any

        return func
      }
    }

    return func
  }

  function map (source, target, sourceObject, targetObject) {
    Assert.isNotNullOrUndefined(sourceObject)
    Assert.isNotNullOrUndefined(targetObject)

    var profileKey = buildProfileKey(source, target)
    if (Type.isNullOrUndefined(profiles[profileKey])) {
      throw new Error('尚未定義 ' + source + ' 與 ' + target + ' 之間的對應關係')
    }

    var profile = profiles[profileKey]
    Assert.isNotNullOrUndefined(profile)

    Object.getOwnPropertyNames(sourceObject).forEach(function (property) {
      if (Type.isNullOrUndefined(profile[property])) {
        targetObject[property] = sourceObject[property]

        return
      }

      var any = profile[property]
      switch (Type.getType(any)) {
        case Types.Null:
          break

        case Types.Function:
          any(sourceObject, targetObject)
          break

        case Types.String:
          targetObject[any] = sourceObject[property]
          break
      }
    })
  }

  // ---- export ------------------------------------------
  var methods = {
    createMap: createMap,
    map: map
  }

  return Object.freeze(methods)
}
