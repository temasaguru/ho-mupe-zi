# ho-mupe-zi

個人ホームページです。

## アクセシビリティ対応状況

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

## 環境変数

|値|内容|
|---|---|
|NEXTAUTH_URL|デプロイ先のURL `https://`から|
|NEXTAUTH_SECRET|`openssl rand 16 -hex`|
|SPOTIFY_CLIENT_ID|potify OAuthクライアントID|
|SPOTIFY_CLIENT_SECRET|Spotify OAuthクライアントシークレット|
|SIGNIN_ALLOWED_EMAILS|Spotifyメアド。俺しかログインできなくしろ|
|UPSTASH_REDIS_REST_URL|UpstashのRedisのエンドポイント|
|UPSTASH_REDIS_REST_TOKEN|UpstashのRedisのAPIトークン|
|ENCRYPTION_KEY|`openssl rand 16 -hex` (これ変えるとトークン保存し直しになるので注意)|
|REVALIDATE_SECONDS|ライブラリのキャッシュ有効期限秒|

---

<details><summary>◀</summary><div>▶▲　　　ん？<br><br>...<br><br>...<br><br>...<br><br><br>▼◀<br>▶▲　　<i>S t a r   A l l i a n c e</i><br><br><br><br><br><br><br><br><br><strike>スターアライアンスの三角は5つだろ！</strike></div></details>
