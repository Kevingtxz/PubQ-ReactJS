import style from "./Question.module.css";
import QuestionModel from "../../model/QuestionModel";
import QuestionService from "../../service/QuestionService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type QuestionProps = {
  question: QuestionModel;
};

export default function Question({ question }: QuestionProps): JSX.Element {
  const subtopic = useSelector((state: RootState) => {
    return state.subtopicReducer.subtopicSelected;
  });
  const topic = useSelector((state: RootState) => {
    return state.topicReducer.topicSelected;
  });
  const nivel = QuestionService.convertNivel(question.nivel);

  const optionListJsx = question.options.map((item) => {
    return (
      <div className={style["options-item"]}>
        <span></span>
        {item}
      </div>
    );
  });

  return (
    <div className={style["container"]}>
      <div className={style["flex"]}>
        <div className={style["header"]}>
          <p className={style["header-item"]}>
            Ano: <span>{question.year}</span>
          </p>
          <p className={style["header-item"]}>
            Tema: <span>{topic?.name}</span>
          </p>
          <p className={style["header-item"]}>
            Tópico: <span>{subtopic?.name}</span>
          </p>
          <p className={style["header-item"]}>
            Nível: <span>{nivel}</span>
          </p>
        </div>
        <div className={style["question"]}>
          <div className={style["text"]}>{question.text}</div>
          <div className={style["options"]}>
            {optionListJsx}
            <div className={style["send"]}>
              <button className={style["send-button"]}>ENVIAR</button>
            </div>
          </div>
          <div className={style["footer"]}>
            <p className={style["footer-item"]}>Questão</p>
            <p className={style["footer-item"]}>Explicação</p>
            <p className={style["footer-item"]}>Reportar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
