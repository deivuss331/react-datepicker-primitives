import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { useState, useMemo, useContext, createContext } from 'react';
import { __DEV_MODE__, PickerLayouts } from 'lib/constants';

const DEFAULT_LAYOUT = PickerLayouts.SINGLE_MONTH;

interface PickerProviderCtxValue {
  selected: ProviderProps['selected'];
  onChange: ProviderProps['onChange'];
  rangeDate: Date;
  setRangeDate: Dispatch<SetStateAction<PickerProviderCtxValue['rangeDate']>>;
  layout: PickerLayouts;
}

const ProviderContext = createContext<PickerProviderCtxValue | null>(null);

if (__DEV_MODE__) {
  ProviderContext.displayName = 'PickerProviderContext';
}

interface ProviderProps {
  selected: Date | null;
  onChange: (selected: ProviderProps['selected']) => void;
  children: ReactNode | ReactNode[];
}

export default function PickerProvider({ selected, onChange, children }: ProviderProps) {
  const [rangeDate, setRangeDate] = useState(new Date());

  const value = useMemo(
    () => ({
      selected,
      onChange,
      rangeDate,
      setRangeDate,
      layout: DEFAULT_LAYOUT,
    }),
    [selected, onChange, rangeDate],
  );

  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
}

export function usePickerContext() {
  const value = useContext(ProviderContext);

  if (!value) {
    throw new Error('"usePickerContext" cannot be used outside the "ProviderContext"');
  }

  return value;
}
