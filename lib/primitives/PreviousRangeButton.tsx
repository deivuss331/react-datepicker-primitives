import type { ButtonHTMLAttributes, ForwardedRef } from 'react';
import { useCallback, forwardRef } from 'react';
import { usePickerContext } from 'lib/primitives/PickerProvider';
import { PickerLayouts } from 'lib/constants';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';

function PreviousRangeButton(
  { onClick, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { setRangeDate, layout } = usePickerContext();

  const handleSetPreviousRange = useCallback(() => {
    setRangeDate((prevRangeDate) => {
      switch (layout) {
        case PickerLayouts.SINGLE_MONTH: {
          return subMonths(prevRangeDate, 1);
        }

        case PickerLayouts.MONTHS_IN_YEAR: {
          return subYears(prevRangeDate, 1);
        }

        case PickerLayouts.YEARS: {
          return prevRangeDate; // ?? TODO
        }

        default: {
          throw new Error('Unsupported layout: "%s"', layout);
        }
      }
    });
  }, [setRangeDate, layout]);

  // TODO a11y
  return (
    <button
      ref={ref}
      type="button"
      onClick={(...args) => {
        handleSetPreviousRange();
        onClick?.(...args);
      }}
      {...restProps}
    />
  );
}

export default forwardRef(PreviousRangeButton);
