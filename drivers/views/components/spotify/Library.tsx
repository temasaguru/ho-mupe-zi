import { clientEnv } from '@/drivers/env/ClientEnv';
import { trpc } from '@/drivers/views/hooks/trpc';
import { useState } from 'react';
import HeadingAndDescription from '../common/HeadingAndDescription';
import TrackInfo from './TrackInfo';

const Library = () => {
  const { data: spotifyLibrary } = trpc.spotify.spotifyLibrary.useQuery({
    limit: clientEnv.SPOTIFY_LIBRARY_LIMIT,
  });
  const length = spotifyLibrary?.tracks ? spotifyLibrary.tracks.length : 0;
  /**
   * 選択中のトラックのID
   * hoverはスマホと相性が悪いため開閉は真偽値で管理
   */
  const [openedTrackId, setOpenedTrackId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-y-4">
      <HeadingAndDescription
        title={`Spotify追加 最新${length}`}
        description={
          <>
            {`タップ or Spaceで詳細を開く`}
            <br />
            {`サブスク解禁されてない曲は表示されない`}
          </>
        }
      />
      <div className="flex w-full flex-wrap">
        {spotifyLibrary?.tracks?.map((track) => (
          <TrackInfo
            key={track.id}
            track={track}
            open={track.id === openedTrackId}
            onClick={() =>
              // 選択中のトラックをクリックで選択解除
              setOpenedTrackId(track.id === openedTrackId ? null : track.id)
            }
          />
        ))}
        {!spotifyLibrary?.tracks && <div>Error</div>}
      </div>
    </div>
  );
};

export default Library;
