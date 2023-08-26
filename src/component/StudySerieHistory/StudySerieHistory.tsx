import style from "./StudySerieHistory.module.css";
import StudySerieHistoryForm from "../../model/dto/form/StudySerieHistoryForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

type StudySerieHistoryProps = {
  history: StudySerieHistoryForm;
};

export default function StudySerieHistory({ history }: StudySerieHistoryProps) {
  const navigate = useNavigate();
  const topicName = useSelector(
    (state: RootState) => state.topicReducer.topicSelected?.name
  );
  const subtopicName = useSelector(
    (state: RootState) => state.subtopicReducer.subtopicSelected?.name
  );
  const totalQuestions = history.totalQuestions;
  const totalCorrect = history.totalCorrect;
  const percentage = `${(
    (history.totalCorrect / history.totalQuestions) *
    100
  ).toFixed(2)}%`;
  const time = history.time;

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className={style["container"]}>
      <div onClick={navigateHome} className={style["back"]}>
        {"<-"}
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>Tópico: {topicName}</p>
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>Subtópico: {subtopicName}</p>
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>
          Tamanho da série: {totalQuestions}
        </p>
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>
          Total de corretas: {totalCorrect}
        </p>
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>
          Porcentagem de acerto: {percentage}
        </p>
      </div>
      <div className={style["history-item-wrapper"]}>
        <p className={style["history-item"]}>Tempo de estudo: {time} sec</p>
      </div>
    </div>
  );
}
