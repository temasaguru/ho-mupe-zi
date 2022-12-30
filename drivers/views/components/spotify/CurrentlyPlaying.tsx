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
    <div className="flex flex-col gap-y-4">
      <HeadingAndDescription title="Now Playing:" />
      <div className="flex flex-col items-center gap-y-3 rounded-xl border-4 border-green-500 pt-6 md:flex-row md:p-5">
        <div className="group relative h-full w-full max-w-[300px] grow-0 overflow-hidden rounded-xl">
          <AlbumArt track={result?.track ?? null} hasError={error !== null} />
          <div className="absolute top-0 left-0 hidden h-full w-full items-center bg-black/80 text-center text-white group-hover:flex">
            {'曲名をクリックしてSpotifyで開く'}
            {error && <span>エラー発生</span>}
            {isLoading && <span>Spotify APIと通信中...</span>}
          </div>
        </div>
        <div className="relative flex w-full grow flex-col items-start gap-x-8 gap-y-4 px-6 pt-4 pb-5">
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
