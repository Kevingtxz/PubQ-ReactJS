import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionReportForm from "../../model/dto/form/QuestionReport";
import envConfig from "../../config/envConfig";

export type useInsertReportQuestionReturn = [
  insertReportQuestion: (form: QuestionReportForm) => void
];

export default function useInsertReportQuestion(): useInsertReportQuestionReturn {
  const insertReportQuestion = useCallback((form: QuestionReportForm) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Access-Control-Allow-Credentials", "true");

    fetch(envConfig.API_URL + UrlEnum.REPORT_QUESTIONS, {
      headers,
      method: MethodsEnum.POST,
      credentials: "include",
      body: JSON.stringify(form),
    });
  }, []);

  return [insertReportQuestion] as useInsertReportQuestionReturn;
}
