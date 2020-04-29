# magiconnect 前端手冊

i18n 使用 react-intl
創建component, container 使用 plop
style 使用 styled-components 跟 react-bootstrap

## 資料夾結構

- .env.development 及 .env.production 儲存全域變數, 可以看見 call 各種 api 的基本網址都在那

- .plop-templates 儲存 plop 的範本檔, 如果沒用過 plop , 可以 npm -g plop , 然後在根目錄打 plop 創建 components, 例如 plop 之後, 選擇 components 或 container 然後輸入名稱,用-符號相連, 例如輸入 test-spinner, 他會幫你創建一個 TestSpinner 的 component

- src
  - assets 儲存圖片及其他難以歸類的 css
  - components 這邊只有有共用性的笨元件才會儲存在這裡
  - configureStore 這邊是 Redux 的 Middleware ,目前只有 app 及 lang 兩個 store, 如果未來有新的store要加進來, 這裡也要補

  - i18n 多國語系的語言翻譯包
  - pages 分大頁面, 裡面會有個別頁面只有自己才會用到的 components
  - utillity 這邊是 api 介接網址的地方, 單純做 api 整理
  - 所有的 router 都會從 routers 引入作為變數使用

- 細講頁面 (pages) 內容
  - allNews 這邊是所有消息的頁面, 分為 header (上面的功能鍵), modal (篩選的 modal), 及 content (內容), store 的東西會從 AllNews.js 往下傳下去, useEffect 也在這裡處理

  - app 主畫面, 負責 header 的功能鍵(地圖, 新增 machine, 帳戶資料操作等..), sidebar 及 i18n 的選擇器, 還有除了一開始進入畫面的 /home 外, 所有的 router 是在這裡面去跑的

  - home 如果進去頁面, 會先拿 account 的資料, 拿不到或認証過期會被踢過來這裡

  - logs 同 allNews

  - MyConnect 這次產品的核心, 六大功能及連線成功後顯示 device 都在這裡
    - ActiveConnection 連線成功之後顯示的內容及功能
    - ConnectFunc 六大功能集中在這裡管理
    - ConnectTable 管理機台顯示的 Table, 點擊 td 會把被點擊的 machine 傳到 redux, 再分給 ConnectFunc.js去往下做
## Use package

- [plop](https://plopjs.com/)
- [React-Redux](https://github.com/reduxjs/react-redux)
- [React-router](https://github.com/ReactTraining/react-router)
- [i18n use react-intl](https://github.com/formatjs/react-intl)
- [prettier](https://github.com/prettier/prettier)
- [css use styled-components](https://www.styled-components.com)

