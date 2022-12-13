import { SpotifyTrackJSON } from '@/application/interfaces/json/spotify/common';
import { KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import AlbumArt from './AlbumArt';
import ArtistList from './ArtistList';

const TrackInfo = ({
  track,
  open,
  n,
  onClick,
}: {
  track: SpotifyTrackJSON;
  open?: boolean;
  /**
   * 最初の画像はlazy loadingできないので何番目かを渡す
   * また、tab indexでも使う
   */
  n: number;
  onClick?: () => any;
}) => {
  /** APIv1現在、ローカルファイルはライブラリに出ないので「検索する」はまず出ないはず */
  const action = track.spotifyUrl ? 'Spotifyで聴く' : '検索する';
  const spotifyUrlOrSearch =
    track.spotifyUrl ?? `https://www.google.com/search?q=${track?.name}`;
  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      tabIndex={0} // 0じゃないと、全ての要素にtabIndexが必要になってしまう
      onClick={onClick}
      onKeyDown={handleOnKeyDown}
      className="group relative w-1/2 cursor-pointer focus:border-8 focus:border-blue-500 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
    >
      {/* 微妙に位置をずらすことで「詳細」を意図せずクリック・タップしないようにする
      画像より曲のテキストを先に書かないと、読み上げの順番が不親切 https://accessible-usable.net/2022/11/entry_221129.html */}
      <div
        className={twMerge(
          'absolute top-0 z-30 hidden h-full w-full flex-col justify-between gap-3 bg-white/80 p-3 shadow-xl contrast-more:bg-white dark:bg-black/80 dark:contrast-more:bg-black',
          // hoverはスマホと相性が悪いため開閉は真偽値で管理、ローカルファイルなら常に表示
          (open || track.is_local) && 'flex'
        )}
      >
        <div>
          <div className="font-bold">{track.name}</div>
          <ArtistList artists={track.artists} />
        </div>
        <a
          // tabIndexを付けることで開いている時にTabでリンクを選べる
          tabIndex={0}
          href={spotifyUrlOrSearch}
          target="_blank"
          className="block rounded-xl bg-black p-1 px-2 text-center font-bold text-white dark:bg-white dark:text-black"
          rel="noreferrer"
          aria-label={`${track.name}のジャケット (クリックで${action})`}
        >
          {action}
        </a>
      </div>
      <AlbumArt
        // 最初の画像が遅延読み込みされているとLCPに影響を与える
        loading={n > 0 ? 'lazy' : 'eager'}
        track={track}
        hasError={false}
      />
    </div>
  );
};

export default TrackInfo;
