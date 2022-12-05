import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';
import { ISpotifyRepository } from '@/application/interfaces/ISpotifyRepository';
import { ISpotifyAPI } from '@/application/interfaces/ISpotifyAPI';

/**
 * Spotifyリポジトリ APIを注入して使う
 */
export class SpotifyRepository implements ISpotifyRepository {
  private api: ISpotifyAPI;

  constructor(api: ISpotifyAPI) {
    this.api = api;
  }

  public getCurrentlyPlayingJSON = async () => {
    return await this.api.getCurrentlyPlaying();
  };

  public getLibraryJSON = async (input: GetSpotifyLibraryInput) => {
    return await this.api.getLibrary(input);
  };
}
