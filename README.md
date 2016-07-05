## 千年バリデータ

千年カルテプロジェクトが必要とするMML4.0インスタンスの妥当性を検証するサーバプログラムです。プロジェクトの基盤であるため、ソースを公開しています。

### 開発環境

 * Java jdk1.8.0_91
 * Eclispse Neon Release (4.6.0)
 * IBM WebSphere Application Server Version 8.5.5.9 Liberty Profile


### 検証方法

 * 対象 XSD: [MML 4.0 Schema](http://www.medxml.net/MML40j/xsd.html)
 * javax.xml.validation を使用 [src/jp/or/ehr/mml/ValidatorResource.java](https://github.com/mbot-dev/1000_validator/blob/master/src/jp/or/ehr/mml/ValidatorResource.java)
 * [稼働インスタンス](https://1000-validator.au-syd.mybluemix.net/)


### 関連情報

 * [千年カルテプロジェク](https://www.facebook.com/%E5%8D%83%E5%B9%B4%E3%82%AB%E3%83%AB%E3%83%86%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88-398609153661839/)
 * [MML 4.0](http://www.medxml.net/MML40j/mml4.html)
 * [千年ビルダー](https://1000-builder.au-syd.mybluemix.net/)
