---
layout: ../layouts/Experience.astro
title: "職務経歴書"
---
# 目次

最終更新: 2023年11月

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
    - [Google Cloud Certified - Cloud Digital Leader](https://www.credential.net/003b470a-2ea4-4ca3-9520-1866f91fa41d) (2023年4月取得)
    - [Google Cloud Certified - Associate Cloud Engineer](https://google.accredible.com/b3674100-cfc6-469a-8484-7f281b49e8c2) (2023年8月取得)
- 使用しているツール・OSなど
    - Git / GitHub, Bitbucket
    - Linux(開発用OSとして、2014-2020年頃まで)
    - macOS (2020年以降)
    - Neovim, zsh

# 職務経歴

## 2022年12月1日 ~ 現在: [株式会社トップゲート](https://topgate.co.jp)

Google Cloud 認定プレミアムパートナー。開発部エンジニアリング室所属

### 業務内容

- Google Cloudを用いたシステム開発
    - 特にCloud Runを主軸としたサーバーレスアーキテクチャでの開発
    - Terraformを使用したクラウドインフラ構築
    - GitHub Actions, Cloud Buildを用いたCI/CDの構築

## 2019年9月25日 ~ 2022年11月31日: [株式会社CMSコミュニケーションズ](https://cmscom.jp)

Pythonと教育をテーマに受託開発を行っている。社員6名(2022年11月末退職時点)

- 雇用形態
    - 2019年9月よりアルバイトとして、2020年6月より社員として勤務。
    - 2021年5月より規定6.4時間の時短勤務で正社員。

### 参画したプロジェクト

- DuckDBでのログ分析基盤構築 (2022年6月~2022年7月)
    - 使用技術: DuckDB, SQLAlchemy 1.14, pandas
    - 学んだこと:
        - データベーストランザクション(完璧ではない)
        - Jupyter notebook上でpandasのDataFrame操作
- 問い合わせ機能付きランディングページサイト開発(2022年4月~2022年6月)
    - 使用技術: Flask 2.x, Terraform 1.x, AWS Lambda, API Gateway, S3, CloudFront
    - 学んだこと:
        - Terraformを用いてのサービス量産
        - Pythonの `importlib` を工夫しての設定読み込み
    - 苦労したこと・できなかったこと
        - AWSのリージョンを跨いだTerraformでの構成管理
- Open edX導入支援 (2022年2月頃~2022年7月)
    - 使用技術: Open edX (version Maple), AWS RDS(MySQL), Docker, click
    - 学んだこと:
        - Django Admin画面での操作
        - Docker(on AWS EC2)ベースでのシステム導入
- PyramidでのAPIサーバー開発 (2021年8月頃~2022年1月頃)
    - 使用技術: Pyramid 2.x, PostgreSQL 12, SQLAlchemy 1.14, Redis 6.x, Ansible 2.11
    - 学んだこと:
        - Session, Cookie管理
        - CORSとPreflight requestについて <https://zenn.dev/peacock0803sz/articles/fe331e04183257>
        - Zope interfaceを使用した開発
        - Ansibleでの構成管理
- Flask + ReactでのWebサービス開発 (2021年3月頃~7月頃)
    - 使用技術: Flask 1.x, Numpy, React + d3.js, AWS Lambda & DynamoDB
    - 学んだこと:
        - OpenAPI Specification (v3.0)
        - toCサービスの開発
        - MVCモデルアーキテクチャでの設計
        - Reactでのコンポーネント開発
        - AWSにてServerless Serviceの立ち上げ
- Pyramid製システムのPython2.7 -> Python3.8アップグレード (2021年初頭)
    - 概要: アップグレードのインフラ担当、アプリケーションコードの修正
        - Legacy EC2をAWS ECS(Fargate)へ移行
        - 2009年ごろのPyramid製サービスをPython3.8へアップグレード
    - 使用技術: Terraform, Bitbucket Piplines, AWS ECS (Fargate)
    - 学んだこと:
        - Terraformを用いたインフラ構築
        - AWS ECS (Fargate)の構築、運用
- Ploneでの大学向け学習支援システム(LMS)開発 (2020年4月~9月頃)
    - 使用技術: Plone 5.2, PostgreSQL 12, SQLAlchemy 1.3
    - 学んだこと:
        - オブジェクト指向プログラミング(クラス継承)での設計
        - Plone PAS(Pluggable Authentication Service)を使った機能の開発
- FlaskでのAPIサーバー開発 (2019年12月~2020年3月頃、2021年3月)
    - 使用技術: Python 3.8, Flask 1.0, Vue.js 2.x, AWS Lambda, DynamoDB
    - 学んだこと:
        - Unit-level test (Pytest)
- Plone 4 -> Plone 5 & Volto 移行用コンテンツ整形スクリプトの開発(2019年11月~2020年3月頃)
    - 使用技術: Python3.7, OpenPyXL, BeautifulSoup4, draft-js
    - 学んだこと:
        - コマンドライン引数解析
        - フルスクラッチでの設計、開発
- AWS Lambda上でのスクレイピングシステム (2019年9月~2021年4月)
    - 使用技術: Python 3.6 - 3.8(BeautifulSoup4), AWS Lambda & S3
    - 学んだこと:
        - ライブラリ(boto3)経由でのAWS S3操作

## 2019年4月8日 ~ 2019年7月31日: 東京電機大学 未来科学部 情報メディア学科 学生職員

- 事務雑用(学科内郵便や授業教室の清掃等)
- 授業で使用するPC環境・サーバー(CentOS)の保守
    - ネットワーク障害の対応
