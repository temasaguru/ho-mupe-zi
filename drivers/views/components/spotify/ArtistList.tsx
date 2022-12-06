import { SpotifyArtistJSON } from '@/application/interfaces/json/spotify/common';

interface ArtistListProps {
  artists: SpotifyArtistJSON[];
}

/**
 * スマホを考慮して、4人以上の場合は「...」で省略する
 */
const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <div aria-label="アーティスト名" className="leading-8">
      {artists.slice(0, 3).map((artist, n) => {
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
            aria-label={`${artist.name}を${action}`}
            rel="noreferrer"
            className="mr-3"
          >
            {artist.name}
          </a>
        );
      })}
      {artists.length > 3 && <span aria-label="4人目移行は省略">...</span>}
    </div>
  );
};
export default ArtistList;
