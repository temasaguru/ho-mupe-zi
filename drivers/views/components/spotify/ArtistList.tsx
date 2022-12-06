import { SpotifyArtistJSON } from '@/application/interfaces/json/spotify/common';

interface ArtistListProps {
  artists: SpotifyArtistJSON[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <div className="flex flex-wrap gap-x-2">
      {artists.map((artist, n) => {
        // 現在聞いている曲がローカルファイルの場合もあり得るので注意
        const action = artist.spotifyUrl ? 'Spotifyで開く' : '検索する';
        const spotifyUrl = artist?.spotifyUrl;
        const spotifyUrlOrSearch =
          spotifyUrl ?? `https://www.google.com/search?q=${artist?.name}`;
        return (
          <a
            key={n}
            href={spotifyUrlOrSearch}
            target="_blank"
            aria-label={`クリックで${artist.name}を${action}`}
            rel="noreferrer"
          >
            {artist.name}
          </a>
        );
      })}
    </div>
  );
};
export default ArtistList;
