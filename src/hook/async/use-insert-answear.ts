import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionAnswearForm from "../../model/dto/form/QuestionAnswear";
import { API_URL } from "../../util/constant-util";

export type useInsertAnswearReturn = [
  insertAnswear: (form: QuestionAnswearForm) => void
];

export default function useInsertAnswear(): useInsertAnswearReturn {
  const insertAnswear = useCallback((form: QuestionAnswearForm) => {
    fetch(API_URL + UrlEnum.QUESTIONS_ANSWEAR_URL, {
      method: MethodsEnum.POST,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  }, []);

  return [insertAnswear] as useInsertAnswearReturn;
}
