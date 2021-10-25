# attachment CMS web

## Getting Started

```bash
$ nvm use
```

- nvm で node バージョンを管理していない場合、手動にて`/.nvmrc`ファイルの node バージョンに切り替えてください

```bash
$ yarn install
$ yarn nuxt
```

`http://localhost:3001/` で 動作確認できます。

## Run

開発モードでの動作

```bash
$ yarn nuxt
```

## Folder Structure

nuxt.js の標準的なフォルダ構成に加えて追加されたファイル配置ルール

- assets
  - stylesheets
    - scss ファイルを配置する場所
    - 基本的に Component に記載するため、Page Component 間で共用したい style が在る場合にだけ利用してください
- components
  - ページ間で共用する Component class のみ、置いてください
- pages
  - Page Component で読み込まれるページ固有の Component は、`components`フォルダを切ってその配下に置いてください
- repositories
  - データアクセスのロジックを配置. 主に API reqeust/response 処理
  - API request/response の method 定義は、`types/attachment-cms-server`の Form/Dto/Serializer 定義を可能な限り利用すること
  - API request/response の method 名は、Controller の method 名と名前を可能な限り合わせること
- services
  - データやルールに関するビジネスロジックを持つ function / class を置いてください
- types
  - 独自 module の d.ts を配置
  - attachment-cms-server プロジェクトで`dist/types/src`に生成した entity, dto, form, serializer の d.ts ファイルをコピーし配置
  - ただし、**`@Exclude` により response から除去された property も d.ts には含まれているので注意**
    - これは Response でのみ発生し、response の json property が定義されているか否かで判断できる
- store
  - 各 module を class として定義している。クラスを分割したい場合、用途別に TypeScript の mixin を用いて分割すること
    https://js.studio-kingdom.com/typescript/handbook/mixins
- utils
  - 汎用的な function / class を置いてください

## Test

jest を利用しています。

```bash
# unit tests
$ yarn test
```

## Coding rules

下記のツールで規制しています

- eslint
- prettier
- stylelint

下記で検証できます

```
$ yarn lint
```

## 忘れそうになる vue.js / vuex との差異

### nuxt が生成するルーティング名が解らなくなった場合

Vue Devtool の Routing > Routes で全ルート確認できる

### nuxt pages で使える特殊命名文字

`_` ファイル/フォルダ名の頭文字に付けると、parameter を mapping できる. `_id`で`:id` route を Mapping
`-` ファイルの頭文字に付けると、ルーティング対象外. ただし、フォルダは対象外

### nuxt で props: true が使えない

サポート対象外
https://github.com/nuxt/nuxt.js/issues/8669#issuecomment-764006062

`$router.push`を直接使う方法はあるが、それなら query や vuex を使う方が推奨されている

### nuxt lifecycle

- middleware
  - SSR モードでは server で処理され、client では処理されない
- asyncData / fetch
  - SSR / Client 両方で処理. static で処理なし
  - fetch は、store を利用するケース
  - asyncData は、store 未利用で return 値で data()に値をマージしたいケース
  - fetch は引数なしを推奨. fetch(context)は Deprecated.
- beforeCreate /created
  - SSR / Client の両方で処理. static で処理あり
- beforeMount / mounted
  - client のみの処理
  - 要認証な処理はここで処理させる事になる？？？

参考: https://qiita.com/too/items/e8ffcf7de7d48dcb9a9b
