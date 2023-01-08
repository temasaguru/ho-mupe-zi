import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io5';
import {
  GITHUB_USERNAME,
  TWITTER_USERNAME,
} from '@/drivers/views/components/const';
import IconHoverButton from '../common/IconHoverButton';

const DefaultHeader = () => {
  return (
    <nav
      aria-label="ナビゲーション"
      className="sticky bottom-0 left-0 z-50 flex h-16 items-center justify-center gap-2 border-y border-gray-300 bg-white/50 py-3 backdrop-blur-lg contrast-more:border-black contrast-more:bg-white dark:bg-stone-800/50 dark:contrast-more:border-white dark:contrast-more:bg-black"
    >
      <IconHoverButton
        href={`https://twitter.com/${TWITTER_USERNAME}`}
        target="_blank"
        rel="noreferrer"
        aria-label="新しいタブでTwitterを開く"
      >
        <IoLogoTwitter />
      </IconHoverButton>
      <h1
        aria-label="サイト名"
        className="flex h-full items-center border-x border-gray-300 px-4 contrast-more:border-black dark:contrast-more:border-white"
      >
        temasaguru
      </h1>
      <IconHoverButton
        href={`https://github.com/${GITHUB_USERNAME}/ho-mupe-zi`}
        target="_blank"
        rel="noreferrer"
        aria-label="新しいタブでGitHubを開く"
      >
        <IoLogoGithub />
      </IconHoverButton>
    </nav>
  );
};
export default DefaultHeader;
