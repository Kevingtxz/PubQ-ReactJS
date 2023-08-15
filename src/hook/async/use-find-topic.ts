import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "../async/use-http";
import TopicForm from "../../model/dto/form/TopicForm";
import TopicModel from "../../model/TopicModel";
import envConfig from "../../config/envConfig";

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
      const model = topicList.find((item) => item.name === topicName);

      if (model) {
        dataHandler(model);
      } else {
        const form: TopicForm = {
          name: topicName,
        };

        fetch(envConfig.API_URL + UrlEnum.SUGGESTION + "/topics", {
          method: MethodsEnum.POST,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
    },
    []
  );

  return [findTopic] as useFindTopicReturn;
}
