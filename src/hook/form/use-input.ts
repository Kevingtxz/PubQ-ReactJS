import { ChangeEvent, useState } from "react";

export type useInputReturn = {
  value: string;
  hasError: boolean;
  isValid: boolean;
  handlerValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlerValueBlur: () => void;
};

export default function useInput(
  validateValue: (enteredValue: string) => boolean,
  initialValue?: string
) {
  const [value, setValue] = useState(initialValue || "");
  const [touched, setTouched] = useState(false);

  const isValid: boolean = validateValue(value);
  const hasError: boolean = !isValid && touched;

  const handlerValueChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setValue(event.target.value);
  const handlerValueBlur = (): void => setTouched(true);

  return {
    value: value,
    hasError,
    isValid,
    setValue,
    handlerValueChange,
    handlerValueBlur,
  };
}
