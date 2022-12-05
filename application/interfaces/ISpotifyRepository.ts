import { SpotifyCurrentlyPlayingJSON } from '@/application/interfaces/json/spotify/CurrentlyPlaying';
import { SpotifyLibraryJSON } from '@/application/interfaces/json/spotify/Library';
import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';

export interface ISpotifyRepository {
  /**
   * 現在の曲を取得
   */
  getCurrentlyPlayingJSON(): Promise<SpotifyCurrentlyPlayingJSON | null>;

  /**
   * ライブラリを取得
   */
  getLibraryJSON(
    input: GetSpotifyLibraryInput
  ): Promise<SpotifyLibraryJSON | null>;
}
