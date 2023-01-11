import { trpc } from '@/drivers/views/hooks/trpc';
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';

/**
 * Markdownを外部から取得して描画
 */
const ExternalMarkdownRenderer = ({
  input,
}: {
  /**
   * あらかじめページ側でインプットを定義することで
   * getStaticProps等でプリフェッチに使える
   */
  input: GetMarkdownContentInput;
}) => {
  const { data, error } = trpc.markdown.getMarkdownHTML.useQuery(input, {
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  if (error) return <div>{error.message}</div>;
  if (data)
    return (
      <div
        /**
         * - w-full: コンテナのpaddingを無視させないために必要
         */
        className="no-scrollbar prose w-full overflow-x-scroll dark:prose-invert xl:prose-xl"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    );
  return null;
};

export default ExternalMarkdownRenderer;
