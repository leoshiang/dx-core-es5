/* global Dolphin */
Dolphin.Strings = function (aDelimiter) {
  // ---- import ------------------------------------------
  var Type = Dolphin.Type

  // ---- private -----------------------------------------
  var delimiter = aDelimiter || ','
  var collection = new Dolphin.Collection()

  function addLine (line) {
    collection.add(line)
  }

  function join (aSeparator) {
    return collection.items.join(delimiter || aSeparator)
  }

  function parse (source) {
    (source || '').split(delimiter).forEach(addLine)
  }

  function toString () {
    return join(delimiter)
  }

  function getDelimiter () {
    return delimiter
  }

  function setDelimiter (newDelimiter) {
    delimiter = newDelimiter
  }

  // ---- export ------------------------------------------
  var methods = {
    join: join,
    parse: parse,
    toString: toString
  }

  var exports = Type.extend(collection, methods)
  Type.defineProperty(exports, 'delimiter', getDelimiter, setDelimiter)

  return exports
}
