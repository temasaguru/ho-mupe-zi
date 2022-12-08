import { SpotifyTrackJSON } from '@/application/interfaces/json/spotify/common';
import { ComponentPropsWithoutRef } from 'react';

interface AlbumArtProps {
  loading?: ComponentPropsWithoutRef<'img'>['loading'];
  track: SpotifyTrackJSON | null;
  hasError: boolean;
}

const AlbumArt = ({ loading = 'lazy', track, hasError }: AlbumArtProps) => {
  /**
   * この画像サイズは300x300
   */
  const albumImage = track?.album.image;
  return (
    <>
      {track ? (
        <>
          {albumImage ? (
            <>
              {/* 公式やDiscordの埋め込みと同様、SpotifyのCDNから直接表示 再キャッシュはしない */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={300}
                height={300}
                src={albumImage?.url}
                alt={track?.album.name ?? ''}
                loading={loading}
                className="w-full"
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-blue-900 text-white">
              ジャケットなし
              <br />
              (iTunes Store or
              <br />
              CD取り込みなど)
            </div>
          )}
        </>
      ) : hasError ? (
        <div className="flex h-full w-full bg-red-800 text-center shadow-xl">
          <div className="m-auto p-4">取得失敗</div>
        </div>
      ) : (
        <div className="flex h-full w-full bg-gray-100 text-center shadow-xl">
          <div className="m-auto p-4">Loading...</div>
        </div>
      )}
    </>
  );
};
export default AlbumArt;
