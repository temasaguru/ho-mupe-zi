import { constants } from 'http2';
import { nanoid } from 'nanoid';
import { SpotifyLibraryJSON } from '@/application/interfaces/json/spotify/Library';
import { SpotifyPlaylistJSON } from '@/application/interfaces/json/spotify/Playlist';
import { SpotifyCurrentlyPlayingJSON } from '@/application/interfaces/json/spotify/CurrentlyPlaying';
import { SpotifyTokens } from '@/domains/entity/spotify/Tokens';
import {
  SpotifyTokenJSON,
  SpotifyTrackJSON,
} from '@/application/interfaces/json/spotify/common';
import {
  IDBConnection,
  DatabaseEncryptedKeys,
  DatabaseKeys,
} from '@/application/interfaces/IDBConnection';
import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';
import { GetSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput';
import { ISpotifyAPI } from '@/application/interfaces/ISpotifyAPI';
import { UpdateSpotifyTokenInput } from '@/application/interfaces/inputs/UpdateSpotifyTokenInput';
import { serverEnv } from '@/drivers/env/ServerEnv';

/**
 * 以下はJSONを参考に設定しただけで、不正確な可能性が大きい
 */

/**
 * 外部URL
 */
export type ExternalUrls = {
  /**
   * ローカルの音楽ファイルなら無い
   */
  spotify: string | null;
};

/**
 * レスポンスの汎用的な形式
 */
export interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: string;
  uri: string;
}

/**
 * アーティスト
 */
export interface Artist {
  external_urls: ExternalUrls;
  href: string | null;
  id: string;
  name: string;
  type: string;
  uri: string | null;
}

/**
 * アルバムジャケット
 */
export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

/**
 * アルバム
 */
export interface Album {
  album_type: string | null;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: (AlbumImage | null)[];
  name: string;
  release_date: string | null;
  release_date_precision: string | null;
  total_tracks: number;
  type: 'album';
  uri: string | null;
}

export interface ExternalIds {
  /**
   * 国際標準レコーディングコード
   * @see https://ja.wikipedia.org/wiki/国際標準レコーディングコード
   */
  isrc: string | null;
}

/**
 * 曲情報
 */
export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string | null;
  id: string | null;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
}

/**
 * ポッドキャストの番組
 */
export interface Show {
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: (AlbumImage | null)[];
  name: string;
  /** アーティスト名に相当 */
  publisher: string;
  release_date: string | null;
  release_date_precision: string | null;
  total_tracks: number;
  type: 'show';
  uri: string | null;
}
/**
 * ポッドキャスト各回の情報
 */
export interface Episode {
  available_markets: string[];
  disc_number: number;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string | null;
  id: string | null;
  /** 曲と違って回には画像がある */
  images: (AlbumImage | null)[];
  name: string;
  show: Show;
  /** ポッドキャストは`episode` */
  type: 'episode';
  uri: string;
}

/**
 * ライブラリで使われる
 */
export interface UserTrack {
  added_at: Date;
  track: Track;
}

/**
 * 現在聞いている曲のAPIレスポンス
 */
export interface SpotifyCurrentlyPlayingResponse {
  error?: { status: number; message: string };
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Track | Episode;
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
}

/**
 * SpotifyのライブラリのAPIレスポンス
 */
export interface SpotifyLibraryResponse {
  href: string;
  items: UserTrack[];
  limit: number;
  offset: number;
  total: number;
}

export interface SpotifyPlaylistResponse extends SpotifyLibraryResponse {}

/**
 * 認証系APIのレスポンス
 */
export interface SpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

/**
 * Spotify APIのv1に合わせた実装
 * DBに依存している
 */
export class SpotifyApiV1 implements ISpotifyAPI {
  private connection: IDBConnection;

  constructor(connection: IDBConnection) {
    this.connection = connection;
  }

  private transformResponseTrackToJSONTrack(
    item: SpotifyCurrentlyPlayingResponse['item']
  ): SpotifyTrackJSON {
    /** 曲はtrue ポッドキャストならfalse */
    const isTrack = item.type === 'track';
    const albumImages = isTrack ? item.album.images : item.images;
    /**
     * アルバム画像[1]は300x300なので使いやすい (APIv1時点の仕様)
     */
    const albumImage =
      albumImages.length > 0 && albumImages[1] ? albumImages[1] : null;
    return {
      /**
       * そもそも、ローカルファイル(idがnull)はライブラリのレスポンスに含まれない
       * しかし型が共通なのと、万が一の仕様変更のためnanoidでフォールバックする
       */
      id: item.id ?? nanoid(10),
      name: item.name,
      spotifyUrl: item.external_urls.spotify,
      album: {
        name: isTrack ? item.album.name : item.show.name,
        spotifyUrl: isTrack
          ? item.album.external_urls.spotify
          : item.show.external_urls.spotify,
        image: albumImage,
      },
      /**
       * ポッドキャスト自体にはアーティストがない
       * 番組にパブリッシャー欄があるのでそれをアーティスト名とする
       */
      artists: isTrack
        ? item.artists.map((artist) => {
            return {
              name: artist.name,
              spotifyUrl: artist.external_urls.spotify,
            };
          })
        : [
            {
              name: item.show.publisher,
              // 番組のURLはあるが、パブリッシャーはないっぽい
              spotifyUrl: null,
            },
          ],
      durationMilliSeconds: item.duration_ms,
    };
  }

  private transformCurrentlyPlayingResponseToJSON(
    response: SpotifyCurrentlyPlayingResponse
  ): SpotifyCurrentlyPlayingJSON {
    const track = this.transformResponseTrackToJSONTrack(response.item);
    return {
      isPlaying: response.is_playing,
      progressMilliSeconds: response.progress_ms,
      track,
    };
  }

  private transformLibraryResponseToJSON(
    response: SpotifyLibraryResponse
  ): SpotifyLibraryJSON {
    return {
      tracks: response.items.map((item) =>
        this.transformResponseTrackToJSONTrack(item.track)
      ),
    };
  }

  private transformPlaylistResponseToJSON(
    response: SpotifyPlaylistResponse
  ): SpotifyPlaylistJSON {
    return {
      tracks: response.items.map((item) =>
        this.transformResponseTrackToJSONTrack(item.track)
      ),
    };
  }

  /**
   * リフレッシュトークンを再取得する
   * @see https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
   */
  public refreshAccessToken = async (
    refresh_token?: string
  ): Promise<SpotifyTokenJSON> => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            serverEnv.SPOTIFY_CLIENT_ID + ':' + serverEnv.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // ここが一番重要
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    });
    const refreshedTokens = (await response.json()) as SpotifyTokenResponse;
    if (!response.ok) {
      throw refreshedTokens;
    }
    return await this.updateTokens({
      accessToken: refreshedTokens.access_token,
    }).then(async () => {
      // 動作確認用に記録
      await this.connection.set<Date>(
        DatabaseKeys.SPOTIFY_REFRESH_TOKEN_UPDATED_AT,
        new Date()
      );
      return {
        accessToken: refreshedTokens.access_token,
        expiresIn: refreshedTokens.expires_in,
      };
    });
  };

  private fetch = async (path: string, init?: RequestInit) => {
    const accessToken = await this.connection.getEncrypted(
      DatabaseEncryptedKeys.SPOTIFY_ACCESS_TOKEN
    );
    const res = await fetch(`https://api.spotify.com/v1${path}`, {
      ...init,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        /**
         * アーティスト名などを日本語で取得するために必要
         * https://diatonic.codes/blog/spotify-japanese/
         */
        'Accept-Language': 'ja',
      },
    });
    return res;
  };

  /**
   * トークンを更新しながら、再度同じリクエストをする
   */
  private refreshAndFetchData = async <T>(
    /**
     * `await res.json() as 〇〇` をした関数を渡す
     */
    fetchData: () => Promise<T | null>
  ): Promise<T | null> => {
    const refreshToken = await this.connection.getEncrypted<string>(
      DatabaseEncryptedKeys.SPOTIFY_REFRESH_TOKEN
    );
    if (refreshToken) {
      return await this.refreshAccessToken(refreshToken).then(async () => {
        return await fetchData();
      });
    }
    return null;
  };

  /**
   * DBからトークンを復号して取得する
   */
  async getTokens(): Promise<SpotifyTokens | null> {
    const accessToken =
      (await this.connection.getEncrypted<string>(
        DatabaseEncryptedKeys.SPOTIFY_ACCESS_TOKEN
      )) ?? null;
    const refreshToken =
      (await this.connection.getEncrypted<string>(
        DatabaseEncryptedKeys.SPOTIFY_REFRESH_TOKEN
      )) ?? null;
    return { accessToken, refreshToken };
  }

  /**
   * DBのトークンを暗号化して保存する
   */
  async updateTokens({
    accessToken,
    refreshToken,
  }: UpdateSpotifyTokenInput): Promise<SpotifyTokens | null> {
    const data = await this.getTokens();
    let existingAccessToken = data?.accessToken;
    let exitingRefreshToken = data?.refreshToken;
    if (accessToken) {
      existingAccessToken =
        (await this.connection.setEncrypted<string>(
          DatabaseEncryptedKeys.SPOTIFY_ACCESS_TOKEN,
          accessToken
        )) ?? data?.accessToken;
    }
    if (refreshToken) {
      exitingRefreshToken =
        (await this.connection.setEncrypted<string>(
          DatabaseEncryptedKeys.SPOTIFY_REFRESH_TOKEN,
          refreshToken
        )) ?? data?.refreshToken;
    }
    return {
      accessToken: existingAccessToken ?? null,
      refreshToken: exitingRefreshToken ?? null,
    };
  }

  /**
   * 現在再生中の曲を取得する
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track
   */
  public getCurrentlyPlaying =
    async (): Promise<SpotifyCurrentlyPlayingJSON | null> => {
      const query = new URLSearchParams();
      /**
       * これがないとポッドキャスト取れない！注意
       */
      query.append('additional_types', 'track,episode');
      const res = await this.fetch(
        '/me/player/currently-playing?' + query.toString()
      );
      const fetchData = async () => {
        const data = (await res.json()) as SpotifyCurrentlyPlayingResponse;
        if (res.ok && data) {
          const transformed =
            this.transformCurrentlyPlayingResponseToJSON(data);
          await this.connection.set('spotify_last_played', transformed);
          return transformed;
        }
        return null;
      };

      switch (res.status) {
        /**
         * トークン有効期限切れ
         */
        case constants.HTTP_STATUS_UNAUTHORIZED:
          await this.refreshAndFetchData(fetchData);
          return null;
        /**
         * 何も再生していない場合
         */
        case constants.HTTP_STATUS_NO_CONTENT:
          const lastPlayed =
            await this.connection.get<SpotifyCurrentlyPlayingJSON>(
              DatabaseKeys.SPOTIFY_LAST_PLAYED
            );
          if (lastPlayed) {
            return {
              ...lastPlayed,
              isPlaying: false,
            };
          } else {
            /**
             * ここに辿り着いた場合、一度も `spotify_last_played` をsetしていない
             * もし「最近再生した曲」を取得しても、レスポンスの形式が大きく異なるため、
             * この場合は俺が手動で再生しながらアクセスするしか無い
             */
            console.warn(
              '俺へ: Spotifyで何か再生した状態でアクセスして、キャッシュさせろ'
            );
            return await this.refreshAndFetchData(fetchData);
          }
        case constants.HTTP_STATUS_OK:
          return await fetchData();
        default:
          return null;
      }
    };

  /**
   * ライブラリを取得する
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks
   *
   * なお、「お気に入りのエピソード」はライブラリとは別のエンドポイントなので含まれない 対応は検討中
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-episodes
   */
  public getLibrary = async ({
    limit,
    offset = 0,
  }: GetSpotifyLibraryInput): Promise<SpotifyLibraryJSON | null> => {
    const query = new URLSearchParams();
    query.append('limit', limit.toString());
    query.append('offset', offset.toString());
    const res = await this.fetch('/me/tracks?' + query.toString());
    const fetchData = async () => {
      const data = (await res.json()) as SpotifyLibraryResponse;
      if (res.ok && data) {
        const transformed = this.transformLibraryResponseToJSON(data);
        return transformed;
      }
      return null;
    };

    switch (res.status) {
      case constants.HTTP_STATUS_UNAUTHORIZED:
        // トークン有効期限切れ
        await this.refreshAndFetchData(fetchData);
        return null;
      case constants.HTTP_STATUS_OK:
        return await fetchData();
      default:
        return null;
    }
  };

  /**
   * プレイリストを取得する
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
   */
  public getPlaylist = async ({
    playlistId,
    limit,
    offset = 0,
  }: GetSpotifyPlaylistInput): Promise<SpotifyPlaylistJSON | null> => {
    const query = new URLSearchParams();
    query.append('limit', limit.toString());
    query.append('offset', offset.toString());
    const res = await this.fetch(
      `/playlists/${playlistId}/tracks?` + query.toString()
    );
    const fetchData = async () => {
      const data = (await res.json()) as SpotifyPlaylistResponse;
      if (res.ok && data) {
        const transformed = this.transformPlaylistResponseToJSON(data);
        return transformed;
      }
      return null;
    };

    switch (res.status) {
      case constants.HTTP_STATUS_UNAUTHORIZED:
        // トークン有効期限切れ
        await this.refreshAndFetchData(fetchData);
        return null;
      case constants.HTTP_STATUS_OK:
        return await fetchData();
      default:
        return null;
    }
  };
}
