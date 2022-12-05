import { ReactNode } from 'react';
import DefaultFooter from './DefaultFooter';
import CurrentlyPlayingFixed from '../spotify/CurrentlyPlayingFixed';
import DefaultHeader from './DefaultHeader';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
      <nav aria-label="ナビゲーション">
        <DefaultHeader />
      </nav>
      <main className="flex grow flex-col pb-4 pt-6 md:py-8">
        {/* Spotifyウィジェット考慮したpadding-bottom */}
        <div className="flex flex-col gap-y-8 pb-[400px] sm:pb-[360px]">
          {children}
          <DefaultFooter />
        </div>
      </main>
      <CurrentlyPlayingFixed />
    </div>
  );
};
export default DefaultLayout;
