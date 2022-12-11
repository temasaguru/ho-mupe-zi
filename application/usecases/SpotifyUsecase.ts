import { SpotifyCurrentlyPlayingJSON } from '@/application/interfaces/json/spotify/CurrentlyPlaying';
import { SpotifyLibraryJSON } from '@/application/interfaces/json/spotify/Library';
import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';
import { ISpotifyRepository } from '@/application/interfaces/ISpotifyRepository';
import { SpotifyPlaylistJSON } from '../interfaces/json/spotify/Playlist';
import { GetSpotifyPlaylistInput } from '../interfaces/inputs/GetSpotifyPlaylistInput';

/**
 * Spotify関連のメソッド tRPCで最終的に使う
 */
export class SpotifyUseCase {
  private repository: ISpotifyRepository;

  constructor(repository: ISpotifyRepository) {
    this.repository = repository;
  }

  public async getCurrentlyPlayingJSON(): Promise<SpotifyCurrentlyPlayingJSON | null> {
    return await this.repository.getCurrentlyPlayingJSON();
  }

  public async getLibraryJSON(
    input: GetSpotifyLibraryInput
  ): Promise<SpotifyLibraryJSON | null> {
    return await this.repository.getLibraryJSON(input);
  }

  public async getPlaylistJSON(
    input: GetSpotifyPlaylistInput
  ): Promise<SpotifyPlaylistJSON | null> {
    return await this.repository.getPlaylistJSON(input);
  }
}
