# attachment CMS Project


## Getting started


### Server
Serverプロジェクトの起動

```bash
$ docker compose up -d --build
$ docker compose exec acms_app yarn orm:migrate
```

動作確認データの投入.
投入時、TEST_USER_EMAILに利用するGoogleアカウントを指定するとデータ閲覧に利用できる

```bash
$ docker compose exec -e TEST_USER_EMAIL=xxxx@gmail.com acms_app yarn seed:dev
```

その後は、

```bash
# Docker Containerの停止 & 削除
$ docker-compose down

# Docker Containerの停止/再開
$ docker-compose stop
$ docker-compose start
```

で行ってください。


```bash
$ docker-compose exec acms_db bash
```

### Web
webは下記で起動してください

```bash
$ cd web
$ nvm use
$ yarn nuxt
```

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

