import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { useState, useMemo, useContext, createContext } from 'react';
import { __DEV_MODE__, PickerLayouts } from 'lib/constants';

const DEFAULT_LAYOUT = PickerLayouts.SINGLE_MONTH;

interface ContextProviderValue {
  selected: ContextProviderProps['selected'];
  onChange: ContextProviderProps['onChange'];
  rangeDate: Date;
  setRangeDate: Dispatch<SetStateAction<ContextProviderValue['rangeDate']>>;
  layout: PickerLayouts;
}

const Ctx = createContext<ContextProviderValue | null>(null);

if (__DEV_MODE__) {
  Ctx.displayName = 'DatePickerPrimitivesCtx';
}

interface ContextProviderProps {
  selected: Date | null;
  onChange: (selected: ContextProviderProps['selected']) => void;
  children: ReactNode | ReactNode[];
}

export default function ContextProvider({ selected, onChange, children }: ContextProviderProps) {
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

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContextProvider() {
  const value = useContext(Ctx);

  if (!value) {
    throw new Error('"useContextProvider" cannot be used outside the "ContextProvider"');
  }

  return value;
}
