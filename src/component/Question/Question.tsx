import style from "./Question.module.css";
import QuestionModel from "../../model/QuestionModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { questionAction } from "../../store/reducer/question-reducer";
import useInsertAnswear from "../../hook/async/use-insert-answear";
import QuestionAnswearForm from "../../model/dto/form/QuestionAnswear";
import { useNavigate } from "react-router-dom";
import useInsertReportQuestion from "../../hook/async/use-insert-report-question";
import QuestionReportForm from "../../model/dto/form/QuestionReport";

type QuestionProps = {
  question: QuestionModel;
};

export default function Question({ question }: QuestionProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [insertAnswear] = useInsertAnswear();
  const [insertReport] = useInsertReportQuestion();
  const subtopic = useSelector((state: RootState) => {
    return state.subtopicReducer.subtopicSelected;
  });
  const topic = useSelector((state: RootState) => {
    return state.topicReducer.topicSelected;
  });
  const [currectPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [reportText, setTextReport] = useState("");
  const [isCorrect, setCorrect] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
    setSelectedOption(-1);
  }, [question]);

  const selectOption = (idx: number) => {
    if (idx === selectedOption) {
      return setSelectedOption(-1);
    }
    setSelectedOption(idx);
  };

  const sendAnswear = () => {
    if (selectedOption === -1) {
      return;
    }

    insertAnswear({
      answear: selectedOption,
      isCorrect: selectedOption === question.correct,
      questionId: question.id,
    } as QuestionAnswearForm);
    setCurrentPage(1);
    setCorrect(selectedOption === question.correct);
  };

  const toHome = () => {
    dispatch(questionAction.loadQuestions([]));
    navigate("/");
  };

  const reportHandler = () => {
    insertReport({
      questionId: question.id,
      text: reportText,
    } as QuestionReportForm);
    setCurrentPage(0);
  };

  const onChangeFunction = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextReport(event.target.value);
  };

  const optionListJsx = question.options.map((item, i) => {
    return (
      <div
        onClick={() => selectOption(i)}
        key={i}
        className={style["options-item"]}
      >
        <span
          key={i}
          className={i === selectedOption ? style["selected-option"] : ""}
        ></span>
        {item}
      </div>
    );
  });

  const questionJsx = (
    <>
      <div className={style["text"]}>{question.question}</div>

      <div className={style["options"]}>
        {optionListJsx}
        <div className={style["send"]}>
          <button
            onClick={() => sendAnswear()}
            className={style["send-button"]}
          >
            ENVIAR
          </button>
        </div>
      </div>
    </>
  );

  const reportJsx = (
    <form onSubmit={reportHandler} className={style["report-form"]}>
      <div className={style["report-container"]}>
        <label className={style["report-text-wrapper"]}>
          <textarea
            className={style["report-text"]}
            placeholder="This question is wrong because..."
            value={reportText}
            onChange={onChangeFunction}
            maxLength={2000}
          />
        </label>
        <button type="submit" className={style["send-button"]}>
          ENVIAR
        </button>
      </div>
    </form>
  );

  const explanationJsx = (
    <>
      {isCorrect ? (
        <div className={style["correct"]}>Correct</div>
      ) : (
        <div className={style["wrong"]}>Wrong</div>
      )}
      <div className={style["explanation"]}>{question.explanation}</div>
    </>
  );

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
          <svg
            onClick={() => toHome()}
            className={style["logo"] + " " + style["header-item"]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            color="#555"
          >
            <path
              style={{ fill: "#555" }}
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
        </div>
        <div className={style["question"]}>
          {(currectPage === 0 && questionJsx) ||
            (currectPage === 1 && explanationJsx) ||
            (currectPage === 2 && reportJsx)}
          <div className={style["footer"]}>
            <p
              onClick={() => setCurrentPage(0)}
              className={style["footer-item"]}
            >
              Questão
            </p>
            <p
              onClick={() => setCurrentPage(1)}
              className={style["footer-item"]}
            >
              Explicação
            </p>
            <p
              onClick={() => setCurrentPage(2)}
              className={style["footer-item"]}
            >
              Reportar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
