import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionReportForm from "../../model/dto/form/QuestionReport";
import { API_URL } from "../../util/constant-util";

export type useInsertReportQuestionReturn = [
  insertReportQuestion: (form: QuestionReportForm) => void
];

export default function useInsertReportQuestion(): useInsertReportQuestionReturn {
  const insertReportQuestion = useCallback((form: QuestionReportForm) => {
    fetch(API_URL + UrlEnum.REPORT_QUESTIONS, {
      method: MethodsEnum.POST,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  }, []);

  return [insertReportQuestion] as useInsertReportQuestionReturn;
}
