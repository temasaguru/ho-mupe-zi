import { MarkdownRepository } from '@/adaptors/repositories/markdown/MarkdownRepository';
import { getMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';
import { MarkdownUseCase } from '@/application/usecases/MarkdownUsecase';
import { GithubAPIv20221128 } from '@/drivers/api/markdown/GithubAPIv20221128';
import { procedure, router } from '@/drivers/trpc/trpc';

const api = new GithubAPIv20221128();
const repository = new MarkdownRepository(api);
const useCase = new MarkdownUseCase(repository);

export const markdownRouter = router({
  getMarkdownHTML: procedure
    .input(getMarkdownContentInput)
    .query(async ({ input }) => {
      return useCase.getMarkdownHTML(input);
    }),
});
