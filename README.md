# attachment CMS Project

## Repository構成

本repositoryでは下記３つのrepositoryをgit subtreeで１つにまとめています。

- lib
  - git@github.com:sryuji/attachment-cms-lib.git
- server
  - git@github.com:sryuji/attachment-cms-server.git
- web
  - git@github.com:sryuji/attachment-cms-web.git

## commit & pushの手順

開発のcommit & pushは本Repositoryに対して行ってください。
（子Repositoryに直接のpushはしない）

```bash
$ git add .
$ git commit -m '子Repositoryのも関連した内容であれば１つのbranch、commitにして良い'
$ git push origin master
```

その後、一通り開発が終わったら、子Repositoryにもpushします。
ただし、***--force***オプションが無いので、できるだけ全ての作業を終えてからpushします。

```bash
$ git subtree push --prefix=server server master
$ git subtree push --prefix=web web master
$ git subtree push --prefix=lib lib master
```

どうしてもforce pushしたいケースが出た場合、
トリッキーですが下記のような方法でsubtreeを作り直してforce pushする事で可能です。
ただし、他に手段がない場合としてください

```bash
$ git push server `git subtree split --prefix=server master`:master --force
$ git push web `git subtree split --prefix=web master`:master --force
$ git push lib `git subtree split --prefix=lib master`:master --force
```


## リリースについて

子Repositoryで個別にリリース作業を行います。

