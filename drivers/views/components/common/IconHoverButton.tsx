import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconHoverButtonProps extends ComponentPropsWithoutRef<'a'> {}

const IconHoverButton = ({
  children,
  className,
  ...props
}: IconHoverButtonProps) => {
  return (
    <a
      className={twMerge(
        'flex h-12 w-12 items-center justify-center rounded-full p-2 text-3xl hover:bg-gray-200 dark:hover:bg-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
export default IconHoverButton;
