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
