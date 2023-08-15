import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionAnswearForm from "../../model/dto/form/QuestionAnswear";
import envConfig from "../../config/envConfig";

export type useInsertAnswearReturn = [
  insertAnswear: (form: QuestionAnswearForm) => void
];

export default function useInsertAnswear(): useInsertAnswearReturn {
  const insertAnswear = useCallback((form: QuestionAnswearForm) => {
    fetch(envConfig.API_URL + UrlEnum.QUESTIONS_ANSWEAR_URL, {
      method: MethodsEnum.POST,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  }, []);

  return [insertAnswear] as useInsertAnswearReturn;
}
