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
- models
  - データの model class/interface を置いてください
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
  - attachment-cms-server プロジェクトで生成した entity, dto, form, serializer の d.ts ファイルをコピーし配置
    - **`@Exclude` で response から除去された property も d.ts には含まれているので注意**
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
