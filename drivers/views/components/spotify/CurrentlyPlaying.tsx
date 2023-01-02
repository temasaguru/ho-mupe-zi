import { twJoin } from 'tailwind-merge';
import { trpc } from '@/drivers/views/hooks/trpc';
import AlbumArt from './AlbumArt';
import MusicInfo from './MusicInfo';
import ProgressBar from './ProgressBar';
import HeadingAndDescription from '../common/HeadingAndDescription';

const CurrentlyPlaying = () => {
  const query = trpc.spotify.spotifyCurrentlyPlaying.useQuery(undefined, {
    // これはミリ秒単位なので注意しろ
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });

  const { data: result, error, isLoading, refetch } = query;
  return (
    <div className="flex w-[320px] flex-col gap-y-4 p-5 sm:rounded-l-xl sm:bg-gray-100 sm:shadow-xl sm:dark:bg-gray-900">
      <div className="text-xl font-black sm:text-2xl">{`Now playing ${
        result?.track?.is_local ? 'locally' : 'on Spotify'
      }:`}</div>
      <div className="flex flex-col items-center gap-y-3">
        <div className="group relative h-full w-full max-w-[300px] grow-0 overflow-hidden rounded-xl">
          <AlbumArt
            track={result?.track ?? null}
            hasError={error !== null}
            isCurrentlyPlayingComponent={true}
          />
        </div>
        <div className="relative flex w-full grow flex-col items-start gap-x-8 gap-y-4">
          <MusicInfo track={result?.track ?? null} hasError={error !== null} />
          <ProgressBar
            refetch={refetch}
            result={result}
            hasError={error !== null}
          />
        </div>
      </div>
    </div>
  );
};
export default CurrentlyPlaying;
