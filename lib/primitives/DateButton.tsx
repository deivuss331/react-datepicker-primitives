import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { useCallback } from 'react';
import { useContextProvider } from 'lib/primitives/ContextProvider';
import isSameDay from 'date-fns/isSameDay';

type GetDateButtonProps = (
  props?: ButtonHTMLAttributes<HTMLButtonElement>,
) => ButtonHTMLAttributes<HTMLButtonElement>;

interface DateButtonProps {
  date: Date;
  render: (params: {
    isSelected: boolean;
    getDateButtonProps: GetDateButtonProps;
  }) => ReactElement<HTMLButtonElement>;
}

export default function DateButton({ date, render }: DateButtonProps) {
  const { selected, onChange } = useContextProvider();

  // TODO a11y
  const getDateButtonProps = useCallback<GetDateButtonProps>(
    ({ onClick, ...restProps } = {}) => ({
      ...restProps,
      onClick: (...args) => {
        onChange(date);
        onClick?.(...args);
      },
    }),
    [date, onChange],
  );

  return render({
    isSelected: selected ? isSameDay(selected, date) : false,
    getDateButtonProps,
  });
}
