import { ComponentProps, forwardRef } from 'react';
import {
  Controller,
  FieldPath,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type InputBaseProps = {
  label?: string;
  errorMassage?: string;
} & ComponentProps<'input'>;

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ label, errorMassage, className, ...props }, ref) => (
    <div className="w-full">
      <label>{label}</label>
      <input
        className={twMerge('input-bordered input w-full max-w-xs', className)}
        ref={ref}
        {...props}
      />
      <label>{errorMassage ?? null}</label>
    </div>
  )
);
InputBase.displayName = 'InputBase';

type Props<T extends FieldValues> = {
  fieldName: FieldPath<T>;
} & Omit<
  ComponentProps<typeof InputBase>,
  'errorMassage' | keyof ControllerRenderProps
>;

/**
 * react-hook-form対応のinput
 * @see https://tech.nri-net.com/entry/react_hook_form_and_yup
 */
const InputControl = <T extends FieldValues>({
  fieldName,
  type,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={fieldName}
      render={({ field: { onChange, ...field }, fieldState }) => (
        <InputBase
          errorMassage={fieldState.error?.message}
          onChange={(e) => {
            if (type === 'number') {
              // 数字のinputで `received string` エラーにならないように
              // https://github.com/react-hook-form/react-hook-form/discussions/8068#discussioncomment-2415789
              onChange(+e.target.value);
            } else {
              onChange([e]);
            }
          }}
          type={type}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default InputControl;
