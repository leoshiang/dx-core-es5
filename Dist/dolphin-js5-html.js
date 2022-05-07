/* global Dolphin */
Dolphin.Html = {}

/* global Dolphin */
Dolphin.Html.Element = function () {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type
  var StrUtils = Dolphin.StrUtils

  // ---- private -----------------------------------------
  var attributes = {}
  var classes = Dolphin.Strings(' ')
  var styles = Dolphin.Strings(';')
  var tag = ''
  var closingTag = true
  var children = Dolphin.Collection()

  function add () {
    // 將參數視為子物件加入
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i]
      if (!arg) {
        continue
      }

      if (!Type.isArray(arg)) {
        children.add(arg)
        continue
      }

      arg.forEach(add)
    }

    return this
  }

  // 設定屬性值
  function attr (attribute, newValue) {
    // 如果沒有參數，回傳所有屬性值
    if (arguments.length === 0) {
      return attributeHTML()
    }

    // class、style 這兩個屬性是 StringList 要另外處理
    var list
    if (attribute === 'class') {
      list = classes
    } else if (attribute === 'style') {
      list = styles
    }

    if (list) {
      if (arguments.length === 2) {
        // class 或是 style 一次指定多個，例如: class = "button active"
        // 所以要用 StringList 的 parse 將傳入值切割
        list.parse(newValue)
        return this
      } else {
        return list.toString()
      }
    }

    // 如果是一個參數
    if (arguments.length === 1) {
      // 如果傳入 "-", 清除屬性值
      if (attribute === '-') {
        attributes = {}
        return this
      }

      // 如果屬性不存在，會取得 undefined
      // null 或是 undefined 就會傳空字串
      var value = attributes[attribute]
      return value || ''
    }

    // 如果參數不等於兩個，或是第二個參數無效，就拋出例外
    if (arguments.length !== 2 || Type.isNullOrUndefined(newValue)) {
      throw new Error('參數應為兩個，或是第二個參數無效')
    }

    // 直接設定屬性值
    attributes[attribute] = newValue

    return this
  }

  function attributeHTML () {
    var result = ''
    Type.getSortedKeys(attributes).forEach(function (name) {
      var value = attributes[name]
      if (value === '') {
        return
      }

      result += ' ' + name + '="' + value + '"'
    })

    result += classes.count > 0 ? ' class="' + classes.join(' ') + '"' : ''
    result += styles.count > 0 ? ' style="' + styles.join(' ') + '"' : ''

    return result
  }

  function attrs (obj) {
    Type.extend(attributes, obj || {})

    return this
  }

  function childElementCount () {
    return children.count
  }

  function css () {
    var result = stringListOperation(classes, arguments)

    return Type.isNullOrUndefined(result) ? this : result
  }

  function emptyHTML () {
    var result = StrUtils.format('<{1}{2}>', tag, attributeHTML())
    if (closingTag) {
      result += StrUtils.format('</{1}>', tag)
    }

    return result
  }

  function forEach (callback) {
    children.forEach(callback)
  }

  function has (child) {
    // 子物件中是否有某個物件
    return children.has(child)
  }

  function isValidHtmlId (id) {
    return Type.isString(id) && id !== '' && StrUtils.startsWith(id, '#')
  }

  function innerHTML () {
    return children.reduce(function (acc, curr) {
      if (Type.isNullOrUndefined(curr)) {
        return acc
      }

      if (Type.isString(curr)) {
        return acc + curr
      }

      return acc + curr.outerHTML()
    }, '')
  }

  function outerHTML () {
    var result = StrUtils.format('<{1}{2}>', tag, attributeHTML())
    if (closingTag) {
      result += StrUtils.format('{1}</{2}>', innerHTML(), tag)
    }

    return result
  }

  function remove (child) {
    children.remove(child)

    return this
  }

  function stringListOperation (list, args) {
    // 如果沒有參數，回傳串列內容
    if (args.length === 0) {
      return list.join()
    }

    // 如果只有一個參數，加入新的值
    if (args.length === 1) {
      list.add(args[0])
      return
    }

    // 如果是兩個參數
    if (args.length === 2) {
      // 第一個參數是 "-"，代表要移除
      if (args[0] === '-') {
        list.remove(args[1])
        return
      }
      throw new Error('參數: ' + args[0])
    }

    throw new Error('參數數量不正確')
  }

  function style () {
    var result = stringListOperation(styles, arguments)

    return Type.isNullOrUndefined(result) ? this : result
  }

  function getTag () {
    return tag
  }

  function setTag (newValue) {
    tag = newValue
  }

  function getClosingTag () {
    return closingTag
  }

  function setClosingTag (newValue) {
    closingTag = newValue
  }

  function getChildren () {
    return children
  }

  // ---- export ------------------------------------------
  var exports = {
    add: add,
    attr: attr,
    attributeHTML: attributeHTML,
    attrs: attrs,
    childElementCount: childElementCount,
    css: css,
    emptyHTML: emptyHTML,
    forEach: forEach,
    has: has,
    innerHTML: innerHTML,
    isValidHtmlId: isValidHtmlId,
    outerHTML: outerHTML,
    remove: remove,
    style: style
  }

  Type.defineProperty(exports, 'tag', getTag, setTag)
  Type.defineProperty(exports, 'closingTag', getClosingTag, setClosingTag)
  Type.defineProperty(exports, 'children', getChildren)

  add.apply(exports, arguments)

  return exports
}

/* global Dolphin */
Dolphin.Html.Tags = [
  'A',
  'Abbr',
  'Acronym',
  'Address',
  'Applet',
  'Area',
  'Article',
  'Aside',
  'Audio',
  'B',
  'Base',
  'Bdi',
  'Bdo',
  'Big',
  'BlockQuote',
  'Body',
  'Br',
  'Button',
  'Canvas',
  'Caption',
  'Center',
  'Cite',
  'Code',
  'Col',
  'ColGroup',
  'Data',
  'DataList',
  'Dd',
  'Del',
  'Details',
  'Dfn',
  'Dialog',
  'Dir',
  'Div',
  'Dl',
  'Dt',
  'Em',
  'Embed',
  'FieldSet',
  'FigCaption',
  'Figure',
  'Footer',
  'Form',
  'Frame',
  'FrameSet',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'Head',
  'Header',
  'Hr',
  'Html',
  'I',
  'IFrame',
  'Img',
  'Input',
  'Ins',
  'Kbd',
  'Label',
  'Legend',
  'Li',
  'Link',
  'Main',
  'Map',
  'Mark',
  'Meta',
  'Meter',
  'Nav',
  'NoFrames',
  'NoScript',
  'Object',
  'Ol',
  'OptGroup',
  'Option',
  'Output',
  'P',
  'Param',
  'Picture',
  'Pre',
  'Progress',
  'Q',
  'Rp',
  'Rt',
  'Ruby',
  'S',
  'Samp',
  'Script',
  'Section',
  'Select',
  'Small',
  'Source',
  'Span',
  'Strike',
  'Strong',
  'Style',
  'Sub',
  'Summary',
  'Sup',
  'Svg',
  'Table',
  'TBody',
  'Td',
  'Template',
  'TextArea',
  'TFoot',
  'Th',
  'THead',
  'Time',
  'Title',
  'Tr',
  'Track',
  'Tt',
  'U',
  'Ul',
  'Video',
  'Wbr'
]

Dolphin.Html.Tags.forEach(function (tag) {
  Dolphin.Html[tag] = function () {
    var result = Dolphin.newWithArgs(Dolphin.Html.Element, arguments)
    result.tag = tag.toLowerCase()

    return result
  }
})