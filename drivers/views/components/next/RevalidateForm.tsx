import { FormProvider, SubmitHandler, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import {
  revalidatePageInput,
  RevalidatePageInput,
} from '@/application/interfaces/inputs/RevalidatePageInput';
import { useTypeSafeForm } from '@/drivers/views/hooks/form';
import InputControl from '@/drivers/views/components/form/InputControl';
import HeadingAndDescription from '../common/HeadingAndDescription';

const RevalidateForm = () => {
  const form = useTypeSafeForm<RevalidatePageInput>({
    defaultValues: { path: '/' },
    resolver: zodResolver(revalidatePageInput),
  });
  const nextRouter = useRouter();
  const onSubmit: SubmitHandler<RevalidatePageInput> = ({ path }) => {
    nextRouter.push('/dashboard/revalidate?path=' + path);
  };
  const { isValid } = useFormState(form);
  return (
    <div>
      <HeadingAndDescription title="ページのデータを更新" />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <InputControl<RevalidatePageInput> label="パス" fieldName="path" />
          <button
            disabled={!isValid}
            type="submit"
            className="rounded-lg bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            更新
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RevalidateForm;
