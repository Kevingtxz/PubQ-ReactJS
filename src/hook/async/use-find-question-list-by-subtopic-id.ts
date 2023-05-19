import { API_URL } from "../../util/constant-util";
import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionView from "../../model/dto/view/QuestionView";
import QuestionService from "../../service/QuestionService";
import QuestionModel from "../../model/QuestionModel";
import urlUtil from "../../util/url-util";

export type findQuestionListBySubtopicIdProps = {
  subtopicId: number;
  dataHandler: (data: any) => void;
};
export type useFindQuestionListBySubtopicIdReturn = [
  findQuestionListBySubtopicId: ({
    subtopicId,
    dataHandler,
  }: findQuestionListBySubtopicIdProps) => void
];

export default function useFindQuestionListBySubtopicId(): useFindQuestionListBySubtopicIdReturn {
  const findQuestionListBySubtopicId = useCallback(
    async ({ subtopicId, dataHandler }: findQuestionListBySubtopicIdProps) => {
      let list: QuestionModel[] = [];

      let viewList: QuestionView[] | undefined;

      try {
        const response = await fetch(
          urlUtil.QUESTIONS_BY_SUBTOPIC(subtopicId, 1),
          {
            method: MethodsEnum.GET,
          }
        );
        viewList = await response.json();
        list = QuestionService.makeModelAll(viewList!);
      } catch (err) {
        list = [];
        console.log(err);
      }

      dataHandler(list);
    },
    []
  );

  return [
    findQuestionListBySubtopicId,
  ] as useFindQuestionListBySubtopicIdReturn;
}
