import React from "react";
import { DAY_MILLISECONDS } from "./constant-util";

export const isValidLength = (str: string) =>
  str.length >= 1 && str.length <= 200;

export const taskFormValidation = {
  validateTitle: (str: string) => isValidLength(str),
  validateExpectedTime: (
    expectedTimeRef: React.MutableRefObject<HTMLInputElement>
  ) =>
    parseInt(expectedTimeRef.current.value) >= 1 &&
    parseInt(expectedTimeRef.current.value) <= 1000,
  validateDeadline: (deadlineRef: React.MutableRefObject<HTMLInputElement>) =>
    new Date(deadlineRef.current.value).getTime() > Date.now() &&
    new Date(deadlineRef.current.value).getTime() <
      new Date(Date.now() + 3 * 365 * DAY_MILLISECONDS).getTime(),
};
