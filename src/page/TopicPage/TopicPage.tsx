import style from "./TopicPage.module.css";
import TopicInput from "../../component/TopicInput/TopicInput";
import useLoad from "../../hook/async/use-load";
import SubtopicList from "../../component/SubtopicList/SubtopicList";
import Header from "../../component/Layout/Header/Header";

export default function TopicPage(): JSX.Element {
  useLoad();

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
