import { SpotifyTrackJSON } from './common';

/**
 * コンポーネントで使う再生中の曲情報
 */
export interface SpotifyCurrentlyPlayingJSON {
  isPlaying: boolean;
  progressMilliSeconds: number | null;
  track: SpotifyTrackJSON | null;
}
