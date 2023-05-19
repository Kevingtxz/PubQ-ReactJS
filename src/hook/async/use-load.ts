import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useHttp, { UrlEnum } from "./use-http";
import { topicAction } from "../../store/reducer/topic-reducer";
import TopicService from "../../service/TopicService";
import TopicView from "../../model/dto/view/TopicView";

export default function useLoad() {
  const dispatch = useDispatch();
  const [isLoading, error, sendRequest] = useHttp();

  useEffect(() => {
    if (!TopicService.isLoadRecent()) {
      sendRequest({
        url: UrlEnum.TOPICS,
        dataHandler: (data: TopicView[]) => {
          const topicList = TopicService.makeModelAll(data);
          TopicService.saveOnLocalStorage(topicList);
          dispatch(topicAction.loadTopics(topicList));
        },
      });
    } else {
      dispatch(topicAction.loadTopics(TopicService.fromLocalStorage()));
    }
  }, [dispatch, sendRequest]);
}
