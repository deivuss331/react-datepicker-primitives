export const __DEV_MODE__ = process.env.NODE_ENV !== 'production';

export enum PickerLayouts {
  SINGLE_MONTH,
  MONTHS_IN_YEAR,
  YEARS,
}
