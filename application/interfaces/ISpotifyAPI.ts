import { SpotifyTokens } from '@/domains/entity/spotify/Tokens';
import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';
import { UpdateSpotifyTokenInput } from '@/application/interfaces/inputs/UpdateSpotifyTokenInput';
import { SpotifyTokenJSON } from '@/application/interfaces/json/spotify/common';
import { SpotifyCurrentlyPlayingJSON } from '@/application/interfaces/json/spotify/CurrentlyPlaying';
import { SpotifyLibraryJSON } from '@/application/interfaces/json/spotify/Library';
import { GetSpotifyPlaylistInput } from './inputs/GetSpotifyPlaylistInput';
import { SpotifyPlaylistJSON } from './json/spotify/Playlist';

/**
 * SpotifyAPIの仕様変更に対応できるようインターフェースを定義
 * **注意: 返り値の型はAPIバージョンに依存してはいけない**
 */
export interface ISpotifyAPI {
  refreshAccessToken(refreshToken?: string): Promise<SpotifyTokenJSON>;
  getTokens(): Promise<SpotifyTokens | null>;
  updateTokens(input: UpdateSpotifyTokenInput): Promise<SpotifyTokens | null>;

  /**
   * 現在の曲を取得
   */
  getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlayingJSON | null>;

  /**
   * ライブラリを取得
   */
  getLibrary(input: GetSpotifyLibraryInput): Promise<SpotifyLibraryJSON | null>;

  /**
   * プレイリストを取得
   */
  getPlaylist(
    input: GetSpotifyPlaylistInput
  ): Promise<SpotifyPlaylistJSON | null>;
}
