import style from "./QuestionList.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Question from "../Question/Question";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionList(): JSX.Element {
  const navigate = useNavigate();
  const questionList = useSelector((state: RootState) => {
    return state.questionReducer.questionList;
  });
  const [idx, setIdx] = useState(0);

  const changeIdx = (idxNew: number) => {
    if (idxNew < 0 || idxNew >= questionList.length) {
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

  return (
    <div className={style["container"]}>
      <div onClick={() => changeIdx(idx - 1)} className={style["previous"]}>
        <div className="fas fa-chevron-left" />
      </div>
      <Question question={questionList[idx]} />
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
