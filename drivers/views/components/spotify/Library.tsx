import { clientEnv } from '@/drivers/env/ClientEnv';
import { trpc } from '@/drivers/views/hooks/trpc';
import HeadingAndDescription from '../common/HeadingAndDescription';
import AlbumArt from './AlbumArt';
import ArtistList from './ArtistList';

const Library = () => {
  const { data: spotifyLibrary } = trpc.spotify.spotifyLibrary.useQuery({
    limit: clientEnv.SPOTIFY_LIBRARY_LIMIT,
  });
  const length = spotifyLibrary?.tracks ? spotifyLibrary.tracks.length : 0;
  return (
    <div className="flex flex-col gap-y-4">
      <HeadingAndDescription
        title={`Spotify追加 最新${length}`}
        description={
          <>
            何人いようとも、どれだけ長くなろうとも、
            <br className="block sm:hidden" />
            アーティスト名は絶対に省略しない
          </>
        }
      />
      <div className="flex w-full flex-wrap">
        {spotifyLibrary?.tracks?.map((track, n) => {
          return (
            <div
              key={track.id}
              // groupでホバーを制御
              className="group relative w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            >
              <AlbumArt
                // 最初の画像が遅延読み込みされているとLCPに影響を与える
                loading={n > 0 ? 'lazy' : 'eager'}
                track={track}
                hasError={false}
              />
              <div className="absolute bottom-0 z-30 flex w-full flex-col gap-3 rounded-xl bg-white/80 p-3 opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100">
                <div className="font-bold">{track.name}</div>
                <div>
                  <ArtistList artists={track.artists} />
                </div>
              </div>
            </div>
          );
        })}
        {!spotifyLibrary?.tracks && <div>Error</div>}
      </div>
    </div>
  );
};

export default Library;
