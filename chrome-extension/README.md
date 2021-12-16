# attachment CMS chrome extension

## Event flow

[![Image from Gyazo](https://i.gyazo.com/c9996b4c32165386f291ca01ccf1178b.png)](https://gyazo.com/c9996b4c32165386f291ca01ccf1178b)

## Know-how

- ServiceWorker は、しばらく操作しないと停止し、extension に関連する操作をすると再起動する
  - background.ts が複数回呼ばれても問題ないように仕組みづくりが必要
- エラーの確実な検知のためには、[DevTools > Sources > extensions > extensions.js]にて、`chrome.developerPrivate.ErrorType.RUNTIME` を受け取る部位で breakpoint で error の中身を確認すること
- `chrome://extensions/`の attachment CMS 拡張機能「ビューを検証 Service Worker」を click し、background 用 Dev tool で console log を確認する

## Rules

### Folders

- `src/background`
  - この extension 向けの background の動き、データ、ルールを定義する
  - State(データ) や Tab、ContextMenu、Message などの動きを定義する
- `src/content-scripts`
- `src/utils`
  - 他 extension でも使える汎用的な関数/class を配置
  - アプリに依存するデータ、ルールは定義しない
  - 可能な限り、 `src/utils`側への汎用化は進めること
    - 画面/操作の変更の影響を受ける部位を少なくするため
    - 同じコード上に変更点があると、誤って変更してしまいやすい

### Others

- `@ts-expect-error` の乱用は禁止. 明らかに ts 側の問題の場合もあるので、その場合にのみ利用する

## Case Studies

### Uncaught Error: Extension context invalidated.

Chrome 拡張を読み込み直したのに、ブラウザのページを読み込み直してない場合に不正であるというエラーが表示される。
Chrome 拡張を動かしているページを再読込してから、該当のプログラムを動かす。
（21/12/17 未対応）
