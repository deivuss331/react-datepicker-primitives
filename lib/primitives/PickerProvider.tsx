import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { useState, useMemo, useContext, createContext } from 'react';
import { __DEV_MODE__ } from 'lib/constants';

interface PickerProviderCtxValue {
  date: Date | null;
  setDate: Dispatch<SetStateAction<PickerProviderCtxValue['date']>>;
  mode: 'days' | 'months' | 'years';
}

const ProviderContext = createContext<PickerProviderCtxValue | null>(null);

if (__DEV_MODE__) {
  ProviderContext.displayName = 'PickerProviderContext';
}

interface ProviderProps {
  children: ReactNode;
}

export default function PickerProvider({ children }: ProviderProps) {
  const [date, setDate] = useState(new Date());
  const value = useMemo(
    () =>
      ({
        date,
        setDate,
        mode: 'days',
      } as const),
    [date],
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
