import { GetMarkdownContentInput } from '../../inputs/GetMarkdownContentInput';

/**
 * フロントに渡すデータ
 */
export interface MarkdownContentJSON {
  fetched_at: Date;
  body: string;
}
