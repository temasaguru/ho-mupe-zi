import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomProgressProps extends ComponentPropsWithoutRef<'div'> {
  value: number;
  max: number;
  valueBarClassName?: string;
}

/**
 *  progressはマジでカスタマイズしづらいし、下手にいじるもんじゃない セマンティックではないが独自divで表現する
 */
const CustomProgress = ({
  value,
  max,
  valueBarClassName,
  className,
  ...props
}: CustomProgressProps) => {
  const widthPercent = Math.floor((value / max) * 100);
  const width = `${widthPercent}%`;
  return (
    <div
      className={twMerge(
        // Windowsハイコントラストで真っ黒な背景に混ざって見えなくなってしまうので白枠線
        'relative h-4 w-full overflow-hidden rounded-xl border border-white bg-black',
        className
      )}
      {...props}
      // Windowsハイコントラストで見えなくなってしまうので
      style={{ forcedColorAdjust: 'none' }}
    >
      <div
        style={{ width }}
        className={twMerge(
          //
          'absolute top-0 left-0 h-full bg-blue-500',
          valueBarClassName
        )}
      />
    </div>
  );
};
export default CustomProgress;
