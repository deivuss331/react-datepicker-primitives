import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { useCallback } from 'react';
import { useContextProvider } from 'lib/primitives/ContextProvider';
import { PickerLayouts } from 'lib/constants';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';

type GetNextRangeButtonProps = (
  props?: ButtonHTMLAttributes<HTMLButtonElement>,
) => ButtonHTMLAttributes<HTMLButtonElement>;

interface NextRangeButtonProps {
  render: (params: { getNextRangeButtonProps: GetNextRangeButtonProps }) => ReactElement<HTMLButtonElement>;
}

export default function NextRangeButton({ render }: NextRangeButtonProps) {
  const { setRangeDate, layout } = useContextProvider();

  // TODO a11y
  const getNextRangeButtonProps = useCallback<GetNextRangeButtonProps>(
    ({ onClick, ...restProps } = {}) => ({
      ...restProps,
      onClick: (...args) => {
        setRangeDate((prevRangeDate) => getNextRangeDate({ rangeDate: prevRangeDate, layout }));
        onClick?.(...args);
      },
    }),
    [setRangeDate, layout],
  );

  return render({ getNextRangeButtonProps });
}

interface GetNextRangeDateParams {
  rangeDate: Date;
  layout: PickerLayouts;
}

const getNextRangeDate = ({ rangeDate, layout }: GetNextRangeDateParams) => {
  switch (layout) {
    case PickerLayouts.SINGLE_MONTH: {
      return addMonths(rangeDate, 1);
    }

    case PickerLayouts.MONTHS_IN_YEAR: {
      return addYears(rangeDate, 1);
    }

    case PickerLayouts.YEARS: {
      return rangeDate; // ?? TODO
    }

    default: {
      throw new Error('Unsupported layout: "%s"', layout);
    }
  }
};
