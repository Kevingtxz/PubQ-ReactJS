import { useDispatch } from "react-redux";
import SubtopicModel from "../../model/SubtopicModel";
import style from "./Subtopic.module.css";
import { subtopicAction } from "../../store/reducer/subtopic-reducer";
import { useNavigate } from "react-router-dom";
import QuestionModel from "../../model/QuestionModel";
import { questionAction } from "../../store/reducer/question-reducer";
import useFindRandomQuestionsBySubtopicId from "../../hook/async/use-find-question-list-by-subtopic-id";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type SubtopicProps = {
  subtopic: SubtopicModel;
};

export default function Subtopic({ subtopic }: SubtopicProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [findRandomQuestionsBySubtopicId] =
    useFindRandomQuestionsBySubtopicId();
  const history = useSelector((state: RootState) =>
    state.authReducer.user?.studySeriesHistory.find(
      (item) => item.subtopicId === subtopic.id
    )
  );
  const hitRate = history
    ? ((history.totalCorrect / history.totalQuestions) * 100).toFixed(2)
    : undefined;

  const handler = () => {
    findRandomQuestionsBySubtopicId({
      subtopicId: subtopic.id,
      dataHandler: (data: QuestionModel[]) => {
        dispatch(questionAction.loadQuestions(data));
      },
    });
    dispatch(
      subtopicAction.selectSubtopic({
        selectedTime: new Date().getTime(),
        ...subtopic,
      })
    );
    navigate("../questions");
  };

  return (
    <div onClick={handler} className={style["container"]}>
      <p className={style["subtopic-name"]}>{subtopic.name}</p>
      {
        <p
          className={
            style["hit-rate"] + (!hitRate ? ` ${style["transparent"]}` : "")
          }
        >
          {hitRate}%
        </p>
      }
    </div>
  );
}
