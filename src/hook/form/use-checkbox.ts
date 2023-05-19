import { useState } from "react";

export type useBoolSwitchReturn = [value: boolean, handler: () => boolean];

export default function useCheckbox(initial: boolean) {
  const [value, setValue] = useState(initial);
  const handler = () => setValue(!value);
  return [value, handler] as useBoolSwitchReturn;
}
