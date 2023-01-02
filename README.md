# ho-mupe-zi

個人ホームページです。

## アクセシビリティ対応状況

- スクリーンリーダーを使いながら開発しています。
  - 読み上げ機能で内容が分かるように最大限配慮しています。
- ほとんどの要素をキーボードで選択できます。
- ダークモードに対応しています。
- macOSのコントラストを上げる機能に対応しています。
- Windowsのハイコントラストモードに対応しています。
- カラーユニバーサルデザインを意識して設計しています。Chrome DevToolsのエミュレーションにより、以下の色覚特性について目視で確認済みです。([参考](https://accessible-usable.net/2021/07/entry_210711.html))
  - Blurred vision (ぼやけ)
  - Protanopia (P型: 赤の視感度に障害)
  - Deuteranopia (D型: 緑の視感度に障害)
  - Tritanopia (T型: 青の視感度に障害)
  - Achromatopsia (A型: 色の識別に障害)
- 端末の「視差効果を減らす」モードに対応しています。

## GitHub Actions

PRにVercel Botがコメントを付けるとトリガーされ、LighthouseでプレビューURLを分析します。

## 開発環境

### 前提

- [プロフィールリポジトリ](https://github.com/temasaguru/temasaguru)に以下のMarkdownがあること
  - `README.md`
  - 任意の場所に設置されたプロフィール本文のmdファイル
- 上記リポジトリを読める状態のGitHub Personal Access Token (Classic)があること
- UpstashにRedisを設置していること
- Spotify開発者向けサイトでOAuthの設定をしていること

### 必須の環境変数

|値|内容|
|---|---|
|NEXTAUTH_URL|デプロイ先のURL `https://`から|
|NEXTAUTH_SECRET|`openssl rand 16 -hex`|
|SPOTIFY_CLIENT_ID|Spotify OAuthクライアントID|
|SPOTIFY_CLIENT_SECRET|Spotify OAuthクライアントシークレット|
|SIGNIN_ALLOWED_EMAILS|Spotifyメアド。俺しかログインできなくしろ|
|UPSTASH_REDIS_REST_URL|UpstashのRedisのエンドポイント|
|UPSTASH_REDIS_REST_TOKEN|UpstashのRedisのAPIトークン|
|ENCRYPTION_KEY|`openssl rand 16 -hex` (これ変えるとトークン保存し直しになるので注意)|
|REVALIDATE_SECONDS|ライブラリのキャッシュ有効期限秒|
|GITHUB_PERSONAL_ACCESS_TOKEN|[プロフィールリポジトリ](https://github.com/temasaguru/temasaguru)を読める状態のGitHub Personal Access Token (Classic)|
|NEXT_PUBLIC_PROFILE_MARKDOWN_FILENAME|[プロフィールリポジトリ](https://github.com/temasaguru/temasaguru)のうち自己紹介に相当するMDのファイル名|

### 任意の環境変数

|値|内容|デフォルト
|---|---|---|
|NEXT_PUBLIC_SPOTIFY_LIBRARY_LIMIT|Spotifyライブラリの取得上限数|`30`|

### 起動

```sh
yarn dev
```

## Special Thanks

### VercelプレビューURLでLighthouse分析

https://github.com/OskarAhl/Lighthouse-github-action-comment

### TypeScript + Clean Architecture

https://qiita.com/sadnessOjisan/items/ea5590efa3f55ef56edd

### 暗号化

https://www.greptips.com/posts/1345/

### Jest環境構築

https://zenn.dev/tkengineer/articles/8cf29c7c8131ba

https://zenn.dev/miruoon_892/articles/e42e64fbb55137

### react-hook-form

https://tech.nri-net.com/entry/react_hook_form_and_yup

https://zenn.dev/yuitosato/articles/292f13816993ef

### GitHub API

https://zenn.dev/e_chan1007/articles/6eeb84f5ce2ef7

---

<details><summary>◀</summary><div>▶▲　　　ん？<br><br>...<br><br>...<br><br>...<br><br><br>▼◀<br>▶▲　　<i>S t a r   A l l i a n c e</i><br><br><br><br><br><br><br><br><br><strike>スターアライアンスの三角は5つだろ！</strike></div></details>
