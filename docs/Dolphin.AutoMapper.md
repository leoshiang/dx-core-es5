# Dolphin.AutoMapper

`說明`

類別 `AutoMapper` 提供將物件屬性複製到另一個物件去的功能。

`命名空間`

> Dolphin

`引入檔案`

> dolphin-js5-core.js

## Methods

## createMap

`說明`

建立 AutoMapper 設定

`參數`

- source {any}
- target {any}

`回傳`

- func {obj}

`範例`

不指定屬性對應，來源物件的屬性都複製到目的物件
```javascript
var autoMapper = new Dolphin.AutoMapper();
autoMapper.createMap('entity', 'viewModel');

var source = {
  name: 'JavaScript 之美',
  isbn: '978-986-347-859-1',
  price: 400
};

var target = {
  name: '重構 JavaScript',
  isbn: '978-986-476-682-6',
  price: 680
};

autoMapper.map('entity', 'viewModel', source, target);
```

以下範例是將屬性透過函數轉換

```javascript
var autoMapper = new Dolphin.AutoMapper();
autoMapper
    .createMap('entity', 'viewModel')
    .forMember('price', function(source, target) {
    		target.price = source.price * 0.9;
    });

var source = {
    name: 'JavaScript 之美',
    isbn: '978-986-347-859-1',
    price: 400
};

var target = {
    name: '重構 JavaScript',
    isbn: '978-986-476-682-6',
    price: 680
};

autoMapper.map('entity', 'viewModel', source, target);
```



## map



