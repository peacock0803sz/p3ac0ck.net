---
layout: ../layouts/Experience.astro
title: "職務経歴書"
---
# 目次

最終更新: 2023-12-28

業務以外の活動については[こちら](/achievements)を参照

# 主なスキル・使用しているツールなど

- できる(実務で使った)
    - Python (3.6以降)
        - Flask 1.x / 2.x, Plone5, Pyramid
        - OpenPyXL, BeautifulSoup4
        - argparse, clickでのコマンドライン引数解析
        - mypy, pytest, black & flake8環境での開発
    - Go (1.18以降)
        - echo
        - Terratest
    - Docker, docker-compose
    - Nginx
    - PostgreSQL
    - AWS (Lambda, S3, DynamoDB, RDS, SES, ECS, CloudWatch)
    - Google Cloud (Cloud Run, Cloud Storage, Cloud Functions, Cloud Build, Compute Engine, Cloud SQL)
    - Terraform
    - CI/CD:
        - Bitbucket Pipelines
        - GitHub Actions
        - Cloud Build
- 少しできる(実務で触ったことがある・個人で使っている)
    - JavaScript / TypeScript (ES2015以降)
        - React, Vue
    - Deno
- 興味がある(チュートリアル触った程度)
    - Rust
        - Haskellを少し触ったことがあり、関数型的指向に興味がある
    - Kubernetes
        - 大規模サービスを運用したことがないので、経験してみたい
- 保有資格
    - [Google Cloud Certified - Cloud Digital Leader](https://www.credential.net/003b470a-2ea4-4ca3-9520-1866f91fa41d) (2023-04取得)
    - [Google Cloud Certified - Associate Cloud Engineer](https://google.accredible.com/b3674100-cfc6-469a-8484-7f281b49e8c2) (2023-08取得)
- 使用しているツール・OSなど
    - Git / GitHub, Bitbucket
    - Linux(開発用OSとして、2014 ~ 2020年頃まで)
    - macOS (2020年以降)
    - Neovim, zsh

# 職務経歴

## 2022-12-01 ~ 現在: [株式会社トップゲート](https://topgate.co.jp)

Google Cloud 認定プレミアムパートナー。開発部エンジニアリング室所属

- 雇用形態
    - 2022-12より正社員として勤務。
    - 2023-12より週4日勤務での契約社員。

### 参画したプロジェクト

- Terraformを用いた他社からGoogle Cloud Compute Engineへの移行構築 (2023-08月 ~ 2023-12)
     - 役割・やったこと: Terraform開発・運用主担当としてTerraformコード全般の開発
- Terrform, Terratestをテストに使用したGoogle Cloudインフラ構築 (2023-03 ~ 2023-06)
     - 役割・やったこと: Terraformを用いたGoogle Cloudインフラ構築、Terratestを用いたTerraform環境へのテストコードの作成
- Go (echo) での大規模Webサービス、インフラ開発(2023-01 ~ 2023-02)
    - 役割・やったこと: Terraformを用いたGoogle Cloudインフラ構築、プロジェクトの進行補佐
- Nuxt.js + Go (echo) でのAPI開発(2022-12)
    - 役割・やったこと: 中途参画メンバーとして、フロントエンド、バックエンドの保守・改修

### プロジェクト外での実績

- 検証用のAWSアカウント環境の整備提案(2023-12)
    - AWS Organizationsでの複数アカウント管理
- 社内勉強会の立ち上げ(2023-09)、登壇(2023-09, 2024-01)
- 社内向け技術ドキュメント執筆推進 (Notion) (2023-06 ~)
- 技術ブログ執筆
    - AlloyDB連載 (2023-04 ~ 2023-09): [Vol.1](https://www.topgate.co.jp/blog/techblog/29096), [Vol.2](https://www.topgate.co.jp/blog/techblog/29265), [Vol.3](https://www.topgate.co.jp/blog/techblog/29608), [Vol.4](https://www.topgate.co.jp/blog/techblog/29727), [Vol.5](https://www.topgate.co.jp/blog/techblog/30340), [Vol.6](https://www.topgate.co.jp/blog/techblog/30648)
    - [Google Cloud SQL Enterprise Plus 紹介記事](https://www.topgate.co.jp/blog/techblog/30092) (2023-07-28)

## 2019-09-25 ~ 2022-11-31: [株式会社CMSコミュニケーションズ](https://cmscom.jp)

Pythonと教育をテーマに受託開発を行っている。社員6名(2022-11-31 退職時点)

- 雇用形態
    - 2019-09よりアルバイトとして、2020-06より社員として勤務。
    - 2021-05より規定6.4時間の時短勤務で正社員。

### 参画したプロジェクト

- DuckDBでのログ分析基盤構築 (2022-06 ~ 2022-07)
    - 使用技術: DuckDB, SQLAlchemy 1.14, pandas
- 問い合わせ機能付きランディングページサイト開発(2022-04 ~ 2022-06)
    - 使用技術: Flask 2.x, Terraform 1.x, AWS Lambda, API Gateway, S3, CloudFront
    - 苦労したこと・できなかったこと
        - AWSのリージョンを跨いだTerraformでの構成管理
- Open edX導入支援 (2022-02 ~ 2022-07)
    - 使用技術: Open edX (version Maple), AWS RDS(MySQL), Docker, click
- PyramidでのAPIサーバー開発 (2021-08 ~ 2022-01)
    - 使用技術: Pyramid 2.x, PostgreSQL 12, SQLAlchemy 1.14, Redis 6.x, Ansible 2.11
- Flask + ReactでのWebサービス開発 (2021-03 ~ 2021-07)
    - 使用技術: Flask 1.x, Numpy, React + d3.js, AWS Lambda & DynamoDB
- Pyramid製システムのPython2.7 -> Python3.8アップグレード (2021-01 ~ 2021-03)
    - 概要: アップグレードのインフラ担当、アプリケーションコードの修正
        - Legacy EC2をAWS ECS(Fargate)へ移行
        - 2009年ごろのPyramid製サービスをPython3.8へアップグレード
    - 使用技術: Terraform, Bitbucket Piplines, AWS ECS (Fargate)
- Ploneでの大学向け学習支援システム(LMS)開発 (2020-4 ~ 2020-09)
    - 使用技術: Plone 5.2, PostgreSQL 12, SQLAlchemy 1.3
- FlaskでのAPIサーバー開発 (2019-12 ~ 2020-03, 2021-03)
    - 使用技術: Python 3.8, Flask 1.0, Vue.js 2.x, AWS Lambda, DynamoDB
- Plone 4 -> Plone 5 & Volto 移行用コンテンツ整形スクリプトの開発(2019-11 ~ 2020-03)
    - 使用技術: Python3.7, OpenPyXL, BeautifulSoup4, draft-js
- AWS Lambda上でのスクレイピングシステム (2019-09 ~ 2021-04)
    - 使用技術: Python 3.6 - 3.8(BeautifulSoup4), AWS Lambda & S3

### プロジェクト外での実績

- 社内勉強会の立ち上げ(2021-04)、登壇(2021-05, 2022-01)
- パスワード管理ツール(1password)の提案、導入

## 2019-04-08 ~ 2019-07-31: 東京電機大学 未来科学部 情報メディア学科 学生職員

- 事務雑用(学科内郵便や授業教室の清掃等)
- 授業で使用するPC環境・サーバー(CentOS)の保守
    - ネットワーク障害の対応
