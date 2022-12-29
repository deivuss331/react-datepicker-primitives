import type { ReactNode } from 'react';
import { useContextProvider } from 'lib/primitives/ContextProvider';

interface SelectedRangeTitleProps {
  render: (params: { rangeDate: Date }) => NonNullable<ReactNode>;
}

export default function SelectedRangeTitle({ render }: SelectedRangeTitleProps) {
  const { rangeDate } = useContextProvider();

  return render({ rangeDate });
}
