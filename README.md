[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

# Dolphin.ES5

Dolphin.ES5 是集合常用的 JavaScript 物件、類別、與功能的程式庫，全部以 ECMAScript 5 撰寫，不需要其他第三方程式庫。

## 安裝方式

請先在系統安裝 [Yarn](https://yarnpkg.com/zh-Hans/)，然後將整個專案 clone 到本機

```shell
git clone https://github.com/leoshiang/Dolphin.ES5.git
```

在 git 根目錄輸入

```
yarn install
```

## 建置

在 git 根目錄輸入

```
yarn build
```

> 系統會自動判斷作業系統是 Windows 或 Mac，執行適當的指令檔。

## 單元測試

在 git 根目錄輸入

```
yarn test
```

> 系統會呼叫 karma 執行單元測試。

## 覆蓋率分析

執行過單元測試之後，Karma 會在 

`reports\coverage-loc\PhantomJs 2.1.1(Windows 8.0`

或是

`reports\coverage-loc\PhantomJs 2.1.1(Mac OS 0.0.0)`

產生覆蓋率的報表，用瀏覽器開啟目錄中的 index.html 即可看到報表。

## NuGet Packages

你可以在 NuGet 找到以下的套件：

[Dolphin.Core](https://www.nuget.org/packages/Dolphin.Core/)

[Dolphin.Collections](https://www.nuget.org/packages/Dolphin.Collections/)

[Dolphin.Html](https://www.nuget.org/packages/Dolphin.Html/)
