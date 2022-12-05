import { ComponentProps, forwardRef } from 'react';
import {
  Controller,
  FieldPath,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type SelectItem = {
  value: string | number;
  label?: string;
};

type SelectBaseProps = {
  label?: string;
  items: SelectItem[];
  errorMassage?: string;
} & ComponentProps<'select'>;

const SelectBase = forwardRef<HTMLSelectElement, SelectBaseProps>(
  ({ label, items, errorMassage, className, ...props }, ref) => (
    <div className="w-full">
      <label>{label}</label>
      <select
        className={twMerge('select-bordered select', className)}
        ref={ref}
        {...props}
      >
        {items.map((item, n) => (
          <option key={n} value={item.value}>
            {item.label ?? item.value}
          </option>
        ))}
      </select>
      <label>{errorMassage ?? null}</label>
    </div>
  )
);
SelectBase.displayName = 'SelectBase';

type Props<T extends FieldValues> = {
  fieldName: FieldPath<T>;
} & Omit<
  ComponentProps<typeof SelectBase>,
  'errorMassage' | keyof ControllerRenderProps
>;

/**
 * react-hook-form対応のselect
 * @see https://tech.nri-net.com/entry/react_hook_form_and_yup
 */
const SelectControl = <T extends FieldValues>({
  fieldName,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={fieldName}
      render={({ field, fieldState }) => (
        <SelectBase
          errorMassage={fieldState.error?.message}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default SelectControl;
