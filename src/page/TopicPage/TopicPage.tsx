import style from "./TopicPage.module.css";
import TopicInput from "../../component/TopicInput/TopicInput";
import SubtopicList from "../../component/SubtopicList/SubtopicList";
import Header from "../../component/Layout/Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useHttp, { UrlEnum } from "../../hook/async/use-http";
import TopicView from "../../model/dto/view/TopicView";
import TopicService from "../../service/TopicService";
import { topicAction } from "../../store/reducer/topic-reducer";

export default function TopicPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  }, [navigate, sendRequest, dispatch]);

  return (
    <div className={style["container"]}>
      <Header />
      <div className={style["select-topic"]}>
        <TopicInput />
        <SubtopicList />
      </div>
    </div>
  );
}
