import { API_URL } from "../../util/constant-util";
import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "../async/use-http";
import TopicForm from "../../model/dto/form/TopicForm";
import TopicService from "../../service/TopicService";
import TopicView from "../../model/dto/view/TopicView";
import TopicModel from "../../model/TopicModel";

export type useFindTopicProps = {
  topicName: string;
  topicList: TopicModel[];
  dataHandler: (data: any) => void;
};
export type useFindTopicReturn = [
  findTopic: ({ topicName, dataHandler }: useFindTopicProps) => void
];

export default function useFindTopic(): useFindTopicReturn {
  const findTopic = useCallback(
    async ({ topicName, topicList, dataHandler }: useFindTopicProps) => {
      let model = topicList.find((item) => item.name === topicName);

      if (!model) {
        const form: TopicForm = {
          name: topicName,
        };

        const response = await fetch(API_URL + UrlEnum.TOPICS, {
          method: MethodsEnum.POST,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const view: TopicView = await response.json();
        model = TopicService.makeModel(view!);
      }

      dataHandler(model);
    },
    []
  );

  return [findTopic] as useFindTopicReturn;
}
