import type { ReactNode } from 'react';
import { usePickerContext } from 'lib/primitives/PickerProvider';

interface RangeDateRendererProps {
  renderDate: (rangeDate: Date) => NonNullable<ReactNode>;
}

export default function RangeDateRenderer({ renderDate }: RangeDateRendererProps) {
  const { rangeDate } = usePickerContext();

  return renderDate(rangeDate);
}
