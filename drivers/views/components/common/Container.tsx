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
        'mx-auto flex max-w-full flex-col items-center justify-center px-4 md:max-w-screen-md'
      )}
      {...props}
    />
  );
};

export default Container;
