import type { ButtonHTMLAttributes, ForwardedRef } from 'react';
import { useCallback, forwardRef } from 'react';
import { usePickerContext } from 'lib/primitives/PickerProvider';
import { PickerLayouts } from 'lib/constants';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';

function NextRangeButton(
  { onClick, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { setRangeDate, layout } = usePickerContext();

  const handleSetNextRange = useCallback(() => {
    setRangeDate((prevRangeDate) => {
      switch (layout) {
        case PickerLayouts.SINGLE_MONTH: {
          return addMonths(prevRangeDate, 1);
        }

        case PickerLayouts.MONTHS_IN_YEAR: {
          return addYears(prevRangeDate, 1);
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
        handleSetNextRange();
        onClick?.(...args);
      }}
      {...restProps}
    />
  );
}

export default forwardRef(NextRangeButton);
