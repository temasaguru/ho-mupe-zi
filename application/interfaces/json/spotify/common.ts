/**
 * ローカルならnull
 */
type StringOrNullIfLocal = string | null;

/**
 * コンポーネントで使用するアーティスト情報
 */
export interface SpotifyArtistJSON {
  name: string;

  spotifyUrl: StringOrNullIfLocal;
}

/**
 * コンポーネントで使用する曲情報
 * 設計簡略化のため、ポッドキャストもこの形式に変換する
 */
export interface SpotifyTrackJSON {
  /** mapした際にkeyで使う */
  id: StringOrNullIfLocal;
  name: string;
  spotifyUrl: StringOrNullIfLocal;
  album: SpotifyAlbumJSON;
  artists: SpotifyArtistJSON[];
  durationMilliSeconds: number;
  is_local: boolean;
}

/**
 * コンポーネントで使用するアルバムジャケット
 */
export interface SpotifyAlbumImageJSON {
  url: string;
  height: number;
  width: number;
}

/**
 * コンポーネントで使用するアルバム
 */
export interface SpotifyAlbumJSON {
  name: string;
  spotifyUrl: StringOrNullIfLocal;
  image: SpotifyAlbumImageJSON | null;
}

/**
 * 認証系APIのレスポンスを整形したもの
 */
export interface SpotifyTokenJSON {
  accessToken: string;
  expiresIn: number;
}
