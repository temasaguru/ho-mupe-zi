import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Container = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        className,
        'mx-auto flex max-w-screen-md flex-col items-center justify-center px-4'
      )}
      {...props}
    />
  );
};

export default Container;
