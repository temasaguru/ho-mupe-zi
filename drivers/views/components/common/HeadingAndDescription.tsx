import { ReactNode } from 'react';

const HeadingAndDescription = ({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3 pt-4 text-center">
      <h2 className="-ml-1 text-2xl font-bold sm:text-3xl">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default HeadingAndDescription;
