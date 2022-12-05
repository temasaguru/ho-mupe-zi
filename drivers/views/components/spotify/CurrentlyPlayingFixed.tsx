import { twJoin } from 'tailwind-merge';
import { trpc } from '@/drivers/views/hooks/trpc';
import AlbumArt from './AlbumArt';
import MusicInfo from './MusicInfo';
import ProgressBar from './ProgressBar';

/**
 * レイアウトシフトを防ぐため、このコンポーネントのサイズは読込中・エラーでも変わらない
 */
const CurrentlyPlayingFixed = () => {
  const query = trpc.spotify.spotifyCurrentlyPlaying.useQuery(undefined, {
    // これはミリ秒単位なので注意しろ
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  });

  const { data: result, error, isLoading, refetch } = query;

  return (
    <div className="fixed left-0 bottom-0 z-50 w-full">
      <div
        className={twJoin(
          'h-54 relative ml-auto w-[11rem] rounded-tl-xl border-t border-l border-black bg-white p-6 pb-0 dark:border-white dark:bg-black sm:w-[14.8rem]',
          /**
           * 角丸の逆バージョンのカーブを影で表現
           * @see https://stackoverflow.com/a/39689166
           */
          'before:absolute before:bottom-0 before:left-[-41px] before:z-10 before:h-4 before:w-10 before:rounded-br-xl before:shadow-[16px_0_0_0_black] dark:before:shadow-[16px_0_0_0_white]',
          'after:absolute after:bottom-0 after:-left-10 after:z-20 after:h-4 after:w-10 after:rounded-br-xl after:shadow-[16px_0_0_0_white] dark:after:shadow-[16px_0_0_0_black]'
        )}
      >
        <AlbumArt track={result?.track ?? null} hasError={error !== null} />
        <div className="absolute flex h-full w-full items-center justify-center">
          {error && <span>エラー発生</span>}
          {isLoading && <span>Spotify APIと通信中...</span>}
        </div>
      </div>
      <div
        className={twJoin(
          'relative flex w-full flex-col items-start gap-x-8 gap-y-4 border-t border-black bg-white px-6 pt-4 pb-5 dark:border-white dark:bg-black sm:flex-row sm:items-end',
          // 右上に白い線を出し、無理矢理黒い枠線を消す
          'after:absolute after:top-[-1px] after:right-0 after:z-30 after:h-1 after:w-[186px] after:bg-white dark:bg-black dark:after:bg-black sm:after:w-[246px]'
        )}
      >
        <MusicInfo track={result?.track ?? null} hasError={error !== null} />
        <ProgressBar
          refetch={refetch}
          result={result}
          hasError={error !== null}
        />
      </div>
    </div>
  );
};
export default CurrentlyPlayingFixed;
