import { useSelector } from "react-redux";
import style from "./QuestionList.module.css";
import { RootState } from "../../store/store";
import Question from "../Question/Question";
import useFindQuestionListBySubtopicId from "../../hook/async/use-find-question-list-by-subtopic-id";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { questionAction } from "../../store/reducer/question-reducer";
import QuestionModel from "../../model/QuestionModel";

export default function QuestionList(): JSX.Element {
  const dispatch = useDispatch();
  const subtopicSelected = useSelector((state: RootState) => {
    return state.subtopicReducer.subtopicSelected;
  });
  const questionList = useSelector((state: RootState) => {
    return state.questionReducer.questionList;
  });
  const [findQuestionListBySubtopicId] = useFindQuestionListBySubtopicId();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (subtopicSelected) {
      findQuestionListBySubtopicId({
        subtopicId: subtopicSelected.id,
        dataHandler: (data: QuestionModel[]) => {
          dispatch(questionAction.loadQuestions(data));
        },
      });
    }
  }, [dispatch, findQuestionListBySubtopicId, subtopicSelected]);

  if (questionList.length === 0) {
    return <></>;
  }

  return (
    <div className={style["container"]}>
      <Question question={questionList[idx]} />
    </div>
  );
}
