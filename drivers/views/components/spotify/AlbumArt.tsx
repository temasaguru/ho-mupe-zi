import { SpotifyTrackJSON } from '@/application/interfaces/json/spotify/common';
import { ComponentPropsWithoutRef } from 'react';

interface AlbumArtProps {
  loading?: ComponentPropsWithoutRef<'img'>['loading'];
  track: SpotifyTrackJSON | null;
  hasError: boolean;
  isCurrentlyPlayingComponent?: boolean;
}

const AlbumArt = ({
  loading = 'lazy',
  track,
  hasError,
  isCurrentlyPlayingComponent = false,
}: AlbumArtProps) => {
  /**
   * この画像サイズは300x300
   */
  const albumImage = track?.album.image;
  return (
    <div className={isCurrentlyPlayingComponent ? 'h-[300px] w-[300px]' : ''}>
      {/* ライブラリのアートワークは幅を可変にしないと、スマホではみでる */}
      {track ? (
        <>
          {/* 公式やDiscordの埋め込みと同様、SpotifyのCDNから直接表示 再キャッシュはしない */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={300}
            height={300}
            // ローカルの場合はあけたみ
            src={albumImage?.url ?? '/apple-touch-icon.png'}
            alt={track?.album.name ?? ''}
            loading={loading}
            className="w-full"
          />
        </>
      ) : hasError ? (
        <div className="flex h-full w-full bg-red-800 text-center shadow-xl">
          <div className="m-auto p-4">取得失敗</div>
        </div>
      ) : (
        <div className="flex h-full w-full bg-gray-100 text-center text-black shadow-xl">
          <div className="m-auto p-4">Loading...</div>
        </div>
      )}
    </div>
  );
};
export default AlbumArt;
