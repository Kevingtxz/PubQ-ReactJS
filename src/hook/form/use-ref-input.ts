import { useRef, useState } from "react";

export type useRefInputReturn = [
  value: React.MutableRefObject<HTMLInputElement>,
  isValid: boolean,
  validate: () => boolean
];

export default function useRefInput(
  func: (props: React.MutableRefObject<HTMLInputElement>) => boolean
) {
  const value = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isValid, setIsValid] = useState(true);
  const validate = () => {
    setIsValid(func(value));
    return func(value);
  };
  return [value, isValid, validate] as useRefInputReturn;
}
