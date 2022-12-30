import { ReactNode } from 'react';
import DefaultFooter from './DefaultFooter';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
      <main className="flex grow flex-col pb-4 pt-6 md:py-8">
        <div className="flex flex-col gap-y-8">
          {children}
          <DefaultFooter />
        </div>
      </main>
    </div>
  );
};
export default DefaultLayout;
