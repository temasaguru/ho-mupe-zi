import Image, { ImageProps } from 'next/image';
import { SpotifyTrackJSON } from '@/application/interfaces/json/spotify/common';

interface AlbumArtProps {
  loading?: ImageProps['loading'];
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
              {albumImage.url.startsWith('https://i.scdn.co') ? (
                <Image
                  width={300}
                  height={300}
                  src={albumImage?.url}
                  alt={track?.album.name ?? ''}
                  loading={loading}
                  // 遅延読み込みでない場合はpriorityが必要 https://nextjs.org/docs/api-reference/next/image#priority
                  priority={loading !== 'lazy'}
                  className="w-full"
                />
              ) : (
                <>
                  {/* 多分i.scdn.coがSpotifyのCDNなんだろうが、突然変えられると対応できないのでimgで対処 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={albumImage?.url}
                    alt={track?.album.name ?? ''}
                    className="w-full"
                  />
                </>
              )}
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
