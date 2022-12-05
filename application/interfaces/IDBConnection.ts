/**
 * 平文で保存する値のキー
 */
export enum DatabaseKeys {
  SPOTIFY_LAST_PLAYED = 'spotify_last_played',
  SPOTIFY_REFRESH_TOKEN_UPDATED_AT = 'spotify_refresh_token_updated_at',
}
/**
 * 暗号化して保存する値のキー
 */
export enum DatabaseEncryptedKeys {
  SPOTIFY_ACCESS_TOKEN = 'spotify_access_token',
  SPOTIFY_REFRESH_TOKEN = 'spotify_refresh_token',
}

/**
 * DB
 * Redis等のKey-Valueストアを想定
 */
export interface IDBConnection {
  /**
   * 値を取得する
   */
  get<T>(key: DatabaseKeys): Promise<T | null | undefined>;

  /**
   * 復号して取得する
   * 暗号化された値として定義していないものは取得できない
   */
  getEncrypted<T>(key: DatabaseEncryptedKeys): Promise<T | null | undefined>;

  /**
   * 暗号化したものを保存する時はUを上書きして使う
   * `U`は`setEncrypted`での使用時に上書きする
   */
  set<T, U extends string = DatabaseKeys>(
    key: U,
    data: T
  ): Promise<T | null | undefined>;

  /**
   * 暗号化して保存する
   * 暗号化された値として定義していないものは保存できない
   */
  setEncrypted<T>(
    key: DatabaseEncryptedKeys,
    data: string
  ): Promise<T | null | undefined>;
}
