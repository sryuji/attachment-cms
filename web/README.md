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
- services
  - データやルールに関するビジネスロジックを持つ function / class を置いてください
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
