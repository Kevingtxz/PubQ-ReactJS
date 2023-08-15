import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import SubtopicView from "../../model/dto/view/SubtopicView";
import SubtopicService from "../../service/SubtopicService";
import envConfig from "../../config/envConfig";

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
      let list = SubtopicService.findFromLocalStorageBySubtopicId(topicId);

      if (list.length === 0) {
        let viewList: SubtopicView[] | undefined;

        try {
          const response = await fetch(
            envConfig.API_URL + UrlEnum.SUBTOPICS_BY_TOPIC + topicId,
            {
              method: MethodsEnum.GET,
              credentials: "include",
            }
          );
          viewList = await response.json();
          list = SubtopicService.makeModelAll(viewList!);
        } catch (err) {
          list = [];
        }
      }

      dataHandler(list);
    },
    []
  );

  return [findSubtopicList] as useSelectTopicReturn;
}
