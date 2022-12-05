import { SpotifyArtistJSON } from '@/application/interfaces/json/spotify/common';

interface ArtistListProps {
  artists: SpotifyArtistJSON[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <div className="flex flex-wrap gap-x-2">
      {/* めちゃ小さいからaにするな、アクセシビリティ下がる */}
      {artists.map((artist) => artist.name).join(' / ')}
    </div>
  );
};
export default ArtistList;
