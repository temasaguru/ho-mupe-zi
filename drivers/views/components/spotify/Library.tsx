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
  const [openedTrack, setOpenedTrack] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-y-4">
      <HeadingAndDescription
        title={`Spotify追加 最新${length}`}
        description="タップで詳細を開く"
      />
      <div className="flex w-full flex-wrap">
        {spotifyLibrary?.tracks?.map((track, n) => (
          <TrackInfo
            key={track.id}
            track={track}
            n={n}
            open={track.id === openedTrack}
            onClick={() => setOpenedTrack(track.id)}
          />
        ))}
        {!spotifyLibrary?.tracks && <div>Error</div>}
      </div>
    </div>
  );
};

export default Library;
