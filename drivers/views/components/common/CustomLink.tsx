import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const CustomLink = ({
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<'a'>) => {
  return (
    <Link href={href ?? '/'} legacyBehavior={true} passHref={true}>
      <a
        className={twMerge(
          'block rounded-lg bg-blue-500 text-white',
          className
        )}
        {...props}
      />
    </Link>
  );
};

export default CustomLink;
