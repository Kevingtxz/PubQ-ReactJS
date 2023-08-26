import style from "./QuestionList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../Question/Question";
import useHttp, { MethodsEnum, UrlEnum } from "../../hook/async/use-http";
import StudySerieHistoryView from "../../model/dto/view/StudySerieHistoryView";
import { authAction } from "../../store/reducer/auth-reducer";
import StudySerieHistory from "../StudySerieHistory/StudySerieHistory";
import StudySerieHistoryForm from "../../model/dto/form/StudySerieHistoryForm";
import HistoryService from "../../service/HistoryService";

export default function QuestionList(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, error, sendRequest] = useHttp();
  const [idx, setIdx] = useState(0);
  const [totalCorrectCounter, setCorrectCounter] = useState(0);
  const [isFinished, setFinished] = useState(false);
  const [history, setHistory] = useState({} as StudySerieHistoryForm);
  const questionList = useSelector((state: RootState) => {
    return state.questionReducer.questionList;
  });
  const subtopic = useSelector(
    (state: RootState) => state.subtopicReducer.subtopicSelected
  );
  const totalQuestions = questionList.length;

  const addCorrect = () => {
    setCorrectCounter(totalCorrectCounter + 1);
  };

  const dataHandler = (data: StudySerieHistoryView) => {
    dispatch(authAction.addHistory(data));
  };

  const finishHandler = () => {
    if (subtopic === undefined) {
      throw new Error();
    }

    sendRequest({
      url: UrlEnum.STUDY_SERIES_HISTORY,
      method: MethodsEnum.POST,
      body: HistoryService.makeForm({
        totalQuestions,
        totalCorrect: totalCorrectCounter,
        subtopic,
      }),
      dataHandler,
    });

    setHistory(
      HistoryService.makeForm({
        totalQuestions,
        totalCorrect: totalCorrectCounter,
        subtopic,
      })
    );
    setFinished(true);
  };

  const changeIdx = (idxNew: number) => {
    if (idxNew === questionList.length) {
      finishHandler();
    }
    if (idxNew < 0) {
      return;
    }

    setIdx(idxNew);
  };

  if (questionList.length === 0) {
    return (
      <div onClick={() => navigate("/")} className={style["list-empty"]}>
        Nao existem questoes para esse topico, clique aqui para voltar
      </div>
    );
  }

  if (isFinished) {
    return <StudySerieHistory history={history} />;
  }

  return (
    <div className={style["container"]}>
      <div onClick={() => changeIdx(idx - 1)} className={style["previous"]}>
        <div className="fas fa-chevron-left" />
      </div>
      <Question question={questionList[idx]} addCorrect={addCorrect} />
      <div className={style["next"]}>
        <div />
        <div
          onClick={() => changeIdx(idx + 1)}
          className="fas fa-chevron-right"
        />
      </div>
    </div>
  );
}
