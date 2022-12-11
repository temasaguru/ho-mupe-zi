import { clientEnv } from '@/drivers/env/ClientEnv';
import { trpc } from '@/drivers/views/hooks/trpc';
import { useState } from 'react';
import HeadingAndDescription from '../common/HeadingAndDescription';
import TrackInfo from './TrackInfo';

const Playlist = () => {
  const { data: spotifyPlaylist } = trpc.spotify.spotifyPlaylist.useQuery({
    playlistId: clientEnv.SPOTIFY_PLAYLIST_ID,
    limit: clientEnv.SPOTIFY_LIBRARY_LIMIT,
  });
  const length = spotifyPlaylist?.tracks ? spotifyPlaylist.tracks.length : 0;
  /**
   * 選択中のトラックのID
   * hoverはスマホと相性が悪いため開閉は真偽値で管理
   */
  const [openedTrackId, setOpenedTrackId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-y-4">
      <HeadingAndDescription
        title={`推し曲 最新${length}`}
        description={
          <>
            {`タップ or Spaceで詳細を開く`}
            <br />
            {`Spotifyサイトは音が出るかもなので注意`}
          </>
        }
      />
      <div className="flex w-full flex-wrap">
        {spotifyPlaylist?.tracks?.map((track, n) => (
          <TrackInfo
            key={track.id}
            track={track}
            n={n}
            open={track.id === openedTrackId}
            onClick={() =>
              // 選択中のトラックをクリックで選択解除
              setOpenedTrackId(track.id === openedTrackId ? null : track.id)
            }
          />
        ))}
        {!spotifyPlaylist?.tracks && <div>Error</div>}
      </div>
    </div>
  );
};

export default Playlist;
