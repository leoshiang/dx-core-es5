# Dolphin.Type

`說明`

Dolphin.Type 提供型別判斷、物件合併、物件判斷的功能。

`命名空間`

>  Dolphin

`引入檔案`

> dolphin-js5-core.js

## getType()

`說明`

取得物件的型別。

`參數`

* obj {any}

`回傳`

* {string} 可能的回傳值如下：

  > Array，Boolean，Date，Function，Null，Number，Object，RegExp，String，Undefined

`範例`

```javascript
console.log(Dolphin.Type.getType([])); // Array
```
如果要連續判斷多次，可以將 getType 先用一個變數儲存，這樣可以減少物件查找的次數。
```javascript
var getType = Dolphin.Type.getType;
console.log(getType([])); // Array
console.log(getType(function(){})); // Function
console.log(getType("abc"); // String
```

## typeNames

`說明`

此物件為所有型別字串的 key-value。

`回傳`

* {object}
  物件包含以下的屬性名稱，其屬性值與屬性名稱相同

  > Array，Boolean，Date，Function，Null，Number，Object，RegExp，String，Undefined

`範例`

以下是取得 typeNames 的屬性值

```javascript
console.log(Dolphin.Type.typeNames.Array); // Array
console.log(Dolphin.Type.typeNames.Number); // Number
```

判斷型別

```javascript
// Cache
var typeNames = Dolphin.Type.typeNames;
var getType = Dolphin.Type.getType;

// 要判斷型別的物件
var obj = [1];

// 判斷型別
if (getType(obj) === typeNames.Array) {
    console.log("obj is an array");
}
```

## equalType()

`說明`

判斷 `obj` 和 `other` 的型別是否相同。

`參數`

* obj {any}
* other {any}

`範例`

```javascript
var a = 1;	 // Number
var b = "1"; // String	
console.log(Dolphin.Type.equalType(a, b)); // false
```

## deepEqual()

`說明`

判斷 `value` 和 `other` 的內容是否相同。

deepEqual 會逐一比對物件的內容，如果有包含子物件或是陣列，也會比對子物件的內容。

`參數`

- obj {any}
- other {any}

`範例`

以下的範例中 b 物件的 skills 陣列比 a 物件少一個元素，因此 deepEqual 會回傳 false。

```javascript
var a = {
    name: "leoshiang",
    address: {
        county: "taiwan",
        county: "yilan",
        skills: ["javascript", "c#"]
    }
}

var b = {
    name: "leoshiang",
    address: {
        county: "taiwan",
        county: "yilan",
        skills: ["javascript"]
    }
}

console.log(Dolphin.Type.deepEqual(a,b)); // false
```

## merge()

`說明`

將多個物件合併成一個物件。如果有相同的屬性，參數後面的物件會蓋掉前面的物件的屬性。

參數是 null 或是 undefined 會被略過。

`參數`

* object1[,object2,...] {any} 任意數量的物件

`範例`

以下範例是將三個物件合併成一個物件。

```javascript
var objectA = {
	propA: 'propA',
	methodA: function() {}
};

var objectB = {
	propB: 1,
	methodB: function() {}
};

var objectC = {
	propC: [1, 2, 3],
	methodC: function() {}
};

var merged = Dolphin.Type.merge(objectA, objectB, objectC);

/*
merge = {
	propA: 'propA',
	propB: 'propB',
	propC: 'propC',
	methodA: function() {}
	methodB: function() {}
	methodC: function() {}
}
*/
```
## extend()
`說明`

將 source 的屬性複製到 target。

extend 會遞迴的複製屬性，如果屬性是套疊多層的物件，也可以複製成功。

extend 會用 target 的屬性去覆蓋掉 source 裡面相同名稱的屬性。

`參數`

* target {object}
* source {object}

`範例`

以下範例是將 objectA 的屬性複製到 objectB

```javascript
var objectA = {
    propA: 'propA',
    stringA: 'methodA'
};

var objectB = {
    propA: 'propA',
    stringA: 'methodA'
};

var Dolphin.Type.extend(objectA, objectB);

//objectA = {
//    propA: 'propA',
//    stringA: 'methodA'
//    propA: 'propA',
//    stringA: 'methodA'
//}
```
## inherit

`說明`

讓 child 繼承 parent。

`參數`

* child {object}
* parent {obejct}

`回傳`

* 無

`範例`

```javascript
// 父類別
function Shape(name) {
    this.name = name;
}

// 父類別的 method
Shape.prototype.paint = function() {
	console.log("I am Shape");    
};

// 子類別
function Triangle(name) {
    // 呼叫父類別的建構函數
    Shape.call(this, name);
}

// 設定繼承關係
Triangle.prototype = Object.create(Shape.prototype);

// 子類別的 method
Triangle.prototype.showName = function() {
    console.log(this.name);
};

var t = new Triangle('triangle');
t.showName(); // triangle
```
## mixin

`說明`

將多個物件的 prototype mix-in 到 target 物件。

`參數`

* target {object}
* mixins [{obejct},{obejct}...]

`回傳`

* 無

`範例`

```javascript
function Bird() {
  this.fly = function() {
    console.log('I can fly');
  };
}

function Animal() {
  this.grow = function() {
    console.log('I can grow');
  };
}

function Eagle() {}

Dolphin.Type.mixin(Eange, Animal, Bird);

var e = new Eagle();
e.fly(); // I can fly
e.grow(); // I can grow
```
## isZero()

`說明`

判斷 obj 是否為數字 0。只有當 obj 是數字且值為 0 才會回傳 true，如果 obj 是字串 "0"，會回傳 false。

`參數`

* obj {any}

`回傳`

* boolean obj 是 `0`  回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isZero("0")); // false
console.log(Dolphin.Type.isZero(0)); // true
}
```
## isPositiveNumber()

`說明`

判斷 obj 是否為正數。只有當 obj 是數字且值為大於 0 才會回傳 true，如果 obj 是字串 "1"，會回傳 false。

`參數`

* obj {any}

`回傳`

* boolean obj 是大於 0 的數字回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isPositiveNumber("1")); // false
console.log(Dolphin.Type.isPositiveNumber(1)); // true
}
```
## isNegativeNumber()

`說明`

判斷 obj 是否為負數。只有當 obj 是數字且值為小於 0 才會回傳 true，如果 obj 是字串 "-1"，會回傳 false。

`參數`

* obj {any}

`回傳`

* boolean obj 是小於 0 的數字回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isPositiveNumber("-1")); // false
console.log(Dolphin.Type.isPositiveNumber(-1)); // true
}
```
## isNullOrUndefined()

`說明`

判斷 obj 是否為 `null` 或是 `undefined`。

`參數`

* obj {any}

`回傳`

* boolean obj 是 `null` 或 `undefined` 回傳 `true`，否則回傳 `false`。

`範例`

```javascript
function log(message) {
    if (!Dolphin.Type.isNullOrUndefined(message)) {
        console.log(message);
    }
}
```
## isNotNullOrUndefined()

`說明`

判斷 obj 不是 `null` 也不是 `undefined`。

`參數`

* obj {any}

`回傳`

* boolean obj 是 `null` 或 `undefined` 回傳 `false`，否則回傳 `true`

`範例`

```javascript
var a = null;
console.log(Dolphin.Type.isNotNullOrUndefined(a)); // false;
```
## isArray

`說明`

判斷引數是否為陣列。

`參數`

* object {any}

`回傳`

* boolean 引數為陣列回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isArray("abc")); // false
console.log(Dolphin.Type.isArray([1,2,3])); // true
```
## isBoolean

`說明`

判斷引數是否為 Boolean。

`參數`

* object {any}

`回傳`

* boolean 引數為 Boolean 回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isBoolean("abc")); // false
console.log(Dolphin.Type.isBoolean(true); // true
```

## isDate

`說明`

判斷引數是否為日期物件。

`參數`

* object {any}

`回傳`

* boolean 引數為日期物件回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isDate(function(){})); // false
console.log(Dolphin.Type.isDate(new Date()); // true
```

## isFunction

`說明`

判斷引數是否為函數。

`參數`

* object {any}

`回傳`

* boolean 引數為Regular Expression 物件回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isDate(function(){})); // false
console.log(Dolphin.Type.isDate(/^.*/); // true
```
## isNull

`說明`

判斷引數是否為 null。

`參數`

* object {any}

`回傳`

* boolean 引數為 null 回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isNull("a"); // false
console.log(Dolphin.Type.isNull(null); // true
```
## isNumber

`說明`

判斷引數是否為數字。

`參數`

* object {any}

`回傳`

* boolean 引數為數字回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isNumber("1"); // false
console.log(Dolphin.Type.isNumber(1); // true
```
## isObject

`說明`

判斷引數是否為物件。

`參數`

* object {any}

`回傳`

* boolean 引數為物件回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isObject(function(){})); // false
console.log(Dolphin.Type.isObject({}); // true
```

## isRegExp

`說明`

判斷引數是否為 Regular Expression 物件。

`參數`

* object {any}

`回傳`

* boolean 引數為Regular Expression 物件回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isRegExp(function(){})); // false
console.log(Dolphin.Type.isRegExp(/^.*/); // true
```

## isString

`說明`

判斷引數是否為字串。

`參數`

* object {any}

`回傳`

* boolean 引數為字串回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isString(function(){})); // false
console.log(Dolphin.Type.isString("test"); // true
```
## isUndefined

`說明`

判斷引數是否為 undefined。

`參數`

* object {any}

`回傳`

* boolean 引數為 undefined 回傳 `true`，否則回傳 `false`

`範例`

```javascript
console.log(Dolphin.Type.isUndefined("a"); // false
console.log(Dolphin.Type.isUndefined(undefined); // true
```
## isNotArray

`說明`

判斷引數是否為陣列。

`參數`

* object {any}

`回傳`

* boolean 引數為陣列回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotArray("abc")); // true
console.log(Dolphin.Type.isNotArray([1,2,3])); // false
```
## isNotBoolean

`說明`

判斷引數是否為 Boolean。

`參數`

* object {any}

`回傳`

* boolean 引數為 Boolean 回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotBoolean("abc")); // true
console.log(Dolphin.Type.isNotBoolean(true); // false
```

## isNotDate

`說明`

判斷引數是否為日期物件。

`參數`

* object {any}

`回傳`

* boolean 引數為日期物件回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotDate(function(){})); // true
console.log(Dolphin.Type.isNotDate(new Date()); // false
```

## isNotFunction

`說明`

判斷引數是否為函數。

`參數`

* object {any}

`回傳`

* boolean 引數為Regular Expression 物件回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotDate(function(){})); // true
console.log(Dolphin.Type.isNotDate(/^.*/); // false
```
## isNotNull

`說明`

判斷引數是否為 null。

`參數`

* object {any}

`回傳`

* boolean 引數為 null 回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotNull("a"); // true
console.log(Dolphin.Type.isNotNull(null); // false
```
## isNotNumber

`說明`

判斷引數是否為數字。

`參數`

* object {any}

`回傳`

* boolean 引數為數字回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotNumber("1"); // true
console.log(Dolphin.Type.isNotNumber(1); // false
```
## isNotObject

`說明`

判斷引數是否為物件。

`參數`

* object {any}

`回傳`

* boolean 引數為物件回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotObject(function(){})); // true
console.log(Dolphin.Type.isNotObject({}); // false
```

## isNotRegExp

`說明`

判斷引數是否為 Regular Expression 物件。

`參數`

* object {any}

`回傳`

* boolean 引數為Regular Expression 物件回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotRegExp(function(){})); // true
console.log(Dolphin.Type.isNotRegExp(/^.*/); // false
```

## isNotString

`說明`

判斷引數是否為字串。

`參數`

* object {any}

`回傳`

* boolean 引數為字串回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotString(function(){})); // true
console.log(Dolphin.Type.isNotString("test"); // false
```
## isNotUndefined

`說明`

判斷引數是否為 undefined。

`參數`

* object {any}

`回傳`

* boolean 引數為 undefined 回傳 `false`，否則回傳 `true`

`範例`

```javascript
console.log(Dolphin.Type.isNotUndefined("a"); // true
console.log(Dolphin.Type.isNotUndefined(undefined); // false
```