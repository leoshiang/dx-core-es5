# Dolphin ES5

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=leoshiang_dx-core-es5&metric=alert_status)](https://sonarcloud.io/dashboard?id=leoshiang_dx-core-es5)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一個完全使用 ECMAScript 5 撰寫的 JavaScript 實用程式庫，提供常用的物件、類別與功能，無需依賴任何第三方程式庫。

## 功能特色

- **純 ES5 實作** - 不依賴任何第三方程式庫
- **核心工具** - 提供類型檢查、字串處理、日誌記錄等核心功能
- **集合操作** - 豐富的陣列和物件操作工具
- **HTML 工具** - DOM 操作和 HTML 處理功能
- **日期時間處理** - 日期時間相關的實用工具
- **診斷工具** - 除錯和診斷功能
- **完整測試** - 使用 QUnit 和 Karma 進行完整測試覆蓋

## 專案結構
```
source/ 
├── core/ # 核心功能模組 
├── collections/ # 集合操作工具 
├── html/ # HTML 相關工具 
├── datetime/ # 日期時間處理 
└── diagnostics/ # 診斷和除錯工具
```

## 安裝

請先在系統安裝 [Node.js](https://nodejs.org/)，然後將整個專案 clone 到本機：
```bash 
git clone [https://github.com/leoshiang/dx-core-es5.git](https://github.com/leoshiang/dx-core-es5.git) cd dx-core-es5
```

使用 npm 安裝依賴：
```bash 
npm install
```

## 建置

執行建置命令：

```bash
npm run build
```
系統會自動根據作業系統（Windows 或 macOS）執行對應的建置腳本。
## 測試
執行單元測試：
``` bash
npm test
```
系統會使用 Karma 執行 QUnit 單元測試。
## 程式碼覆蓋率
測試完成後，Karma 會在以下目錄產生覆蓋率報告：
- Windows: `reports/coverage-loc/PhantomJs 2.1.1(Windows 8.0)`
- macOS: `reports/coverage-loc/PhantomJs 2.1.1(Mac OS 0.0.0)`

用瀏覽器開啟目錄中的 `index.html` 即可檢視詳細的覆蓋率資訊。
## SonarQube 分析
執行程式碼品質分析：
``` bash
npm run sonarqube
```
## 程式碼風格
本專案遵循 [JavaScript Standard Style](https://standardjs.com) 程式碼風格標準。
## NuGet Packages
你可以在 NuGet 找到以下的套件：
- [Dolphin.Core](https://www.nuget.org/packages/Dolphin.Core/)
- [Dolphin.Collections](https://www.nuget.org/packages/Dolphin.Collections/)
- [Dolphin.Html](https://www.nuget.org/packages/Dolphin.Html/)

## 開發環境需求
- Node.js
- npm
- PhantomJS（用於測試）

## 貢獻指南
1. Fork 此專案
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權條款
本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。
## 致謝
感謝所有為此專案做出貢獻的開發者。
