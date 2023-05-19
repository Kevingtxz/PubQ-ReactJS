import { API_URL } from "../../util/constant-util";
import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import SubtopicView from "../../model/dto/view/SubtopicView";
import SubtopicService from "../../service/SubtopicService";

export type findSubtopicListProps = {
  topicId: number;
  dataHandler: (data: any) => void;
};
export type useSelectTopicReturn = [
  findSubtopicList: ({ topicId, dataHandler }: findSubtopicListProps) => void
];

export default function useFindSubtopicList(): useSelectTopicReturn {
  const findSubtopicList = useCallback(
    async ({ topicId, dataHandler }: findSubtopicListProps) => {
      let subtopicList =
        SubtopicService.findFromLocalStorageBySubtopicId(topicId);

      if (subtopicList.length === 0) {
        let subtopicViewList: SubtopicView[] | undefined;

        try {
          const response = await fetch(
            API_URL + UrlEnum.SUBTOPICS_BY_TOPIC + topicId,
            {
              method: MethodsEnum.GET,
            }
          );
          subtopicViewList = await response.json();
          subtopicList = SubtopicService.makeModelAll(subtopicViewList!);
        } catch (err) {
          subtopicList = [];
          console.log(err);
        }
      }

      dataHandler(subtopicList);
    },
    []
  );

  return [findSubtopicList] as useSelectTopicReturn;
}
