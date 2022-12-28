import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { usePickerContext } from 'lib/primitives/PickerProvider';
import { PickerLayouts } from 'lib/constants';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';

interface RangeDatesRendererProps {
  renderDates: (rangeDates: Date[]) => ReactNode;
}

export default function RangeDatesRenderer({ renderDates }: RangeDatesRendererProps) {
  const { rangeDate, layout } = usePickerContext();
  const rangeDates = useMemo(() => {
    switch (layout) {
      case PickerLayouts.SINGLE_MONTH: {
        const startOfRangeMonth = startOfMonth(rangeDate);
        return new Array(getDaysInMonth(rangeDate))
          .fill(null)
          .map((_, index) => addDays(startOfRangeMonth, index));
      }

      case PickerLayouts.MONTHS_IN_YEAR: {
        return eachMonthOfInterval({
          start: startOfYear(rangeDate),
          end: endOfYear(rangeDate),
        });
      }

      case PickerLayouts.YEARS: {
        return [rangeDate]; // ?? TODO
      }

      default: {
        throw new Error('Unsupported layout: "%s"', layout);
      }
    }
  }, [rangeDate, layout]);

  return renderDates(rangeDates);
}
