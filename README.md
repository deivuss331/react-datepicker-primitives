# 📅 React Datepicker Primitives

The goal of this project is to build react datepicker primitive components (or hooks?) which will:
* be easy to use
* be easy to style
* be easy to configure
* be a11y friendly
* let developers configure html structure

---

Pickers will be most-likely separated from RangePickers. This is done intentionally to keep it type-safe.
Think of situation when you're creating simple DatePicker so `date` might be either type of `Date` or `null`.
If Pickers wouldn't be separated from RangePickers then possible types would be: `Date` | `Date[]` | `null`.
We could possibly consider creating one variant which could accept mode (`picker` | `rangePicker`) which could set correct types...