import { getSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput';
import { getSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput';
import { SpotifyUseCase } from '@/application/usecases/SpotifyUsecase';
import { SpotifyRepository } from '@/adaptors/repositories/spotify/SpotifyRepository';
import { RedisConnection } from '@/drivers/databases/RedisConnection';
import { SpotifyApiV1 } from '@/drivers/api/spotify/SpotfyAPIv1';
import { EncrypterAES256CBC } from '@/drivers/encrypters/EncrypterAES256CBC';
import { procedure, router } from '@/drivers/trpc/trpc';

const encrypter = new EncrypterAES256CBC();
const connection = new RedisConnection(encrypter);
const api = new SpotifyApiV1(connection);
const repository = new SpotifyRepository(api);
const useCase = new SpotifyUseCase(repository);

export const spotifyRouter = router({
  spotifyCurrentlyPlaying: procedure.query(async () => {
    return await useCase.getCurrentlyPlayingJSON();
  }),
  spotifyLibrary: procedure
    .input(getSpotifyLibraryInput)
    .query(async ({ input }) => {
      return await useCase.getLibraryJSON(input);
    }),
  spotifyPlaylist: procedure
    .input(getSpotifyPlaylistInput)
    .query(async ({ input }) => {
      return await useCase.getPlaylistJSON(input);
    }),
});
