import { useCallback } from "react";
import { MethodsEnum } from "./use-http";
import QuestionView from "../../model/dto/view/QuestionView";
import QuestionService from "../../service/QuestionService";
import QuestionModel from "../../model/QuestionModel";
import urlUtil from "../../util/url-util";

export type findRandomQuestionsBySubtopicIdProps = {
  subtopicId: number;
  dataHandler: (data: any) => void;
};
export type useFindQuestionListBySubtopicIdReturn = [
  findQuestionListBySubtopicId: ({
    subtopicId,
    dataHandler,
  }: findRandomQuestionsBySubtopicIdProps) => void
];

export default function useFindRandomQuestionsBySubtopicId(): useFindQuestionListBySubtopicIdReturn {
  const findRandomQuestionsBySubtopicId = useCallback(
    async ({
      subtopicId,
      dataHandler,
    }: findRandomQuestionsBySubtopicIdProps) => {
      let list: QuestionModel[] = [];

      let viewList: QuestionView[] | undefined;

      try {
        const response = await fetch(
          urlUtil.RANDOM_QUESTIONS_BY_SUBTOPIC(subtopicId),
          {
            method: MethodsEnum.GET,
            credentials: "include",
          }
        );
        viewList = await response.json();
        list = QuestionService.makeModelAll(viewList!);
      } catch (err) {
        list = [];
      }

      dataHandler(list);
    },
    []
  );

  return [
    findRandomQuestionsBySubtopicId,
  ] as useFindQuestionListBySubtopicIdReturn;
}
