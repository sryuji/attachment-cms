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


```bash
$ git subtree push --prefix=server server master
$ git subtree push --prefix=web web master
$ git subtree push --prefix=lib lib master
```

## リリースについて

子Repositoryで個別にリリース作業を行います。

