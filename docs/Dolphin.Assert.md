# Dolphin.Assert

`說明`

Assert 是用來判斷參數是否符合條件，若不符合就會拋出指定的例外與錯誤訊息。常用在驗證參數是否合法，物件是否有效...。

`命名空間`

>  Dolphin

`引入檔案`

> dolphin-js5-core.js

## 型別判斷函數(isXXX, isNotXX)

參數有三個

* obj {any} 任意物件
* message {string} 錯訊訊息
* exception {function} 例外物件

以下的 is 函數是判斷參數是否為該函數名稱的型態，如果型別不相同，拋出指定的例外 exception 與訊息 message，如果未傳入 exception，則會拋出 AssertException
例如 isArray 的參數是 Array會拋出例外。

* isArray 
* isBoolean
* isDate
* isFunction
* isNull
* isNumber
* isObject
* isRegExp
* isString
* isUndefined

isNot 這類函數與 is 相反，以 isNotArray 為例，如果參數是陣列就會拋出例外：

* isNotArray
* isNotBoolean
* isNotDate
* isNotFunction
* isNotNull
* isNotNumber
* isNotObject
* isNotRegExp
* isNotString
* isNotUndefined

`範例`

```javascript
var Assert = Dolphin.Assert;
Assert.isArray([]); // 不會拋出例外
Assert.isArray(1); // 拋出例外
var obj = 1;
Assert.isArray(obj, "參數不是陣列"); // 拋出例外與指定的錯誤訊息
```
## index

`說明`

判斷索引值 index 是否在 min ,max 範圍內，如果超出範圍就拋出例外

`參數`

* min {number} 最小值
* max {number} 最大值
* index {number} 索引值
* message {string} 錯誤訊息
* exception {function} 例外物件

`範例`

```javascript
var index = 10;
Dolphin.Assert.indx(0, 100, 10); // 不會拋出例外
Dolphin.Assert.indx(0, 100, 200); // 會拋出例外
```
## isTrue

`說明`

如果條件式 condition 不是 true 就拋出例外

`參數`

* condition {boolean} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
var index = 10;
Dolphin.Assert.isTrue(index !== 11);
```
## isInstanceOf

`說明`

如果 child 不是 parent 的 instance 就拋出例外

`參數`

* child {object} 
* parent {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
var index = 10;
Dolphin.Assert.isInstanceOf(index !== 11);
```
## isNotEmptyString

`說明`

如果 value 是空字串就拋出例外

`參數`

* value {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
Dolphin.Assert.isNotEmptyString("a"); // 不會拋出例外
Dolphin.Assert.isNotEmptyString(""); // 拋出例外
```
## isEmptyString

`說明`

如果 value 不是空字串就拋出例外

`參數`

* value {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
Dolphin.Assert.isEmptyString("a"); // 拋出例外
Dolphin.Assert.isEmptyString(""); // 不會拋出例外
```
## isEqual

`說明`

isEqual 會用 Dolphin.Type.deepEqual 來判斷 obj 和 other 內容是否，不相同就拋出例外。

`參數`

* obj {object} 
* other {obj}
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
var objA = {
  name: 'objA',
  size: 1
};

var objB = {
	name: 'objB'
};

Dolphin.Assert.isEqual(objA, objB);
```
## isNotEqual

`說明`

isEqual 會用 Dolphin.Type.deepEqual 來判斷 obj 和 other 內容是否，相同就拋出例外。

`參數`

* obj {object} 
* other {obj}
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
var objA = {
  name: 'objA',
  size: 1
};

var objB = {
	name: 'objB'
};

Dolphin.Assert.isNotEqual(objA, objB);
```

## isNullOrUndefined

`說明`

如果參數不是 null 也不是 undefined 就拋出例外。

`參數`

* obj {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
Dolphin.Assert.isNullOrUndefined(null);
```

## isNullOrUndefined

`說明`

如果參數不是 null 也不是 undefined 就拋出例外。

`參數`

* obj {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
Dolphin.Assert.isNullOrUndefined(null);
```

## isNotNullOrUndefined

`說明`

如果參數不是 null 也不是 undefined 就拋出例外。

`參數`

* obj {object} 
* message {string} 錯訊訊息
* exception {function} 例外物件

`範例`

```javascript
Dolphin.Assert.isNotNullOrUndefined(null);
```