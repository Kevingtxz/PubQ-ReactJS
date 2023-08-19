import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionAnswearForm from "../../model/dto/form/QuestionAnswear";
import envConfig from "../../config/envConfig";

export type useInsertAnswearReturn = [
  insertAnswear: (form: QuestionAnswearForm) => void
];

export default function useInsertAnswear(): useInsertAnswearReturn {
  const insertAnswear = useCallback((form: QuestionAnswearForm) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Access-Control-Allow-Credentials", "true");

    fetch(envConfig.API_URL + UrlEnum.QUESTIONS_ANSWEAR_URL, {
      headers,
      method: MethodsEnum.POST,
      credentials: "include",
      body: JSON.stringify(form),
    });
  }, []);

  return [insertAnswear] as useInsertAnswearReturn;
}
