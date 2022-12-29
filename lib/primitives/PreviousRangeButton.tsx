import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { useCallback } from 'react';
import { useContextProvider } from 'lib/primitives/ContextProvider';
import { PickerLayouts } from 'lib/constants';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';

type GetPreviousRangeButtonProps = (
  props?: ButtonHTMLAttributes<HTMLButtonElement>,
) => ButtonHTMLAttributes<HTMLButtonElement>;

interface PreviousRangeButtonProps {
  render: (params: {
    getPreviousRangeButtonProps: GetPreviousRangeButtonProps;
  }) => ReactElement<HTMLButtonElement>;
}

export default function PreviousRangeButton({ render }: PreviousRangeButtonProps) {
  const { setRangeDate, layout } = useContextProvider();

  // TODO a11y
  const getPreviousRangeButtonProps = useCallback<GetPreviousRangeButtonProps>(
    ({ onClick, ...restProps } = {}) => ({
      ...restProps,
      onClick: (...args) => {
        setRangeDate((prevRangeDate) => getPreviousRangeDate({ rangeDate: prevRangeDate, layout }));
        onClick?.(...args);
      },
    }),
    [setRangeDate, layout],
  );

  return render({ getPreviousRangeButtonProps });
}

interface GetPreviousRangeDateParams {
  rangeDate: Date;
  layout: PickerLayouts;
}

const getPreviousRangeDate = ({ rangeDate, layout }: GetPreviousRangeDateParams) => {
  switch (layout) {
    case PickerLayouts.SINGLE_MONTH: {
      return subMonths(rangeDate, 1);
    }

    case PickerLayouts.MONTHS_IN_YEAR: {
      return subYears(rangeDate, 1);
    }

    case PickerLayouts.YEARS: {
      return rangeDate; // ?? TODO
    }

    default: {
      throw new Error('Unsupported layout: "%s"', layout);
    }
  }
};
