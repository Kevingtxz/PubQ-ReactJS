import style from "./QuestionPage.module.css";
import QuestionList from "../../component/QuestionList/QuestionList";

export default function QuestionPage(): JSX.Element {
  return (
    <div className={style["container"]}>
      <QuestionList />
    </div>
  );
}
