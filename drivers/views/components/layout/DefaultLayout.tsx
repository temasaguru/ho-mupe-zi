import { ReactNode } from 'react';
import DefaultFooter from './DefaultFooter';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col dark:bg-stone-900 dark:text-white">
      <main className="flex grow flex-col">
        <div className="flex flex-col gap-y-8">
          {children}
          <DefaultFooter />
        </div>
      </main>
    </div>
  );
};
export default DefaultLayout;
