import { QueryObserverResult } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { SpotifyCurrentlyPlayingJSON } from '@/application/interfaces/json/spotify/CurrentlyPlaying';
import CustomProgress from '../common/CustomProgress';

/**
 * 曲の長さ(ms)と進捗(ms)から、割合と分:秒を表示する
 * ***状 態 管 理 地 獄***
 */
const ProgressBar = ({
  result,
  refetch,
  hasError,
}: {
  result?: SpotifyCurrentlyPlayingJSON | null;
  refetch: () => Promise<
    QueryObserverResult<SpotifyCurrentlyPlayingJSON | undefined | null>
  >;
  hasError: boolean;
}) => {
  /**
   * 再生中にこの数字を増やす
   */
  const [progressMsState, setProgressMsState] = useState(
    result?.progressMilliSeconds ?? 0
  );
  useEffect(() => {
    setProgressMsState(result?.progressMilliSeconds ?? 0);
  }, [result]);
  /**
   * 曲の長さはメモ化
   */
  const trackDuration = useMemo(
    () => result?.track?.durationMilliSeconds ?? 1001,
    [result?.track]
  );
  const progressDate = useMemo(
    () => new Date(progressMsState),
    [progressMsState]
  );
  const progressString = useMemo(
    () =>
      `${progressDate.getMinutes()}:${progressDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`,
    [progressDate]
  );
  const [progressPercent, setProgressPercent] = useState(0);

  /**
   * 1秒すすめる
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (result?.isPlaying && progressMsState < trackDuration - 1000) {
        setProgressMsState(progressMsState + 1000);
      }
    }, 1000);
    setProgressPercent(Math.floor((progressMsState / trackDuration) * 100));
    return () => clearInterval(interval);
  }, [progressMsState, result?.isPlaying, trackDuration]);

  /**
   * 曲が終わったら再度通信する
   */
  useEffect(() => {
    if (trackDuration && progressMsState >= trackDuration - 1000) {
      refetch();
    }
  }, [refetch, progressMsState, trackDuration]);
  const durationDate = useMemo(() => new Date(trackDuration), [trackDuration]);
  const durationString = useMemo(
    () =>
      `${durationDate.getMinutes()}:${durationDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`,
    [durationDate]
  );
  return (
    <div className="flex grow flex-col-reverse items-center gap-y-3 self-stretch">
      <div className="flex w-full items-center justify-between gap-x-3">
        <div aria-label="曲の再生時間" className="w-12">
          {progressString}
        </div>
        <CustomProgress
          className={twMerge(
            'min-w-[12rem] flex-grow',
            result ? '' : 'bg-red-800'
          )}
          value={progressPercent ?? 0}
          max={100}
        />
        <div aria-label="曲の長さ" className="w-12">
          {durationString}
        </div>
      </div>
      <div className="flex items-center gap-x-3 text-sm text-gray-800">
        <button
          disabled={!result}
          className={twMerge(
            'inline-flex h-12 w-12 cursor-default cursor-not-allowed items-center justify-center rounded-full bg-white',
            result?.isPlaying && 'bg-green-500'
          )}
          // 空のdivが中身なので、アクセシビリティのために必ずaria-labelを付ける
          aria-label={'再生・一時停止ボタン'}
          // なぜか見えなくなるので
          style={{ forcedColorAdjust: 'none' }}
          title={
            result?.track
              ? result?.isPlaying
                ? '今聴いてる曲を表示中'
                : '最後に聴いた曲を表示中'
              : hasError
              ? '取得失敗'
              : 'Loading...'
          }
        >
          {result?.isPlaying ? (
            <div className="mr-2 flex">
              <div className="h-4 w-1 bg-black after:ml-2 after:block after:h-4 after:w-1 after:bg-black"></div>
            </div>
          ) : (
            <div className="ml-4 h-0 w-0 scale-x-150 border-8 border-transparent border-l-black"></div>
          )}
          {/* border-transparentがないと三角の周囲に灰色が見えてしまう */}
        </button>
      </div>
    </div>
  );
};
export default ProgressBar;
