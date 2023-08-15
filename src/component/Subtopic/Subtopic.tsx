import { useDispatch } from "react-redux";
import SubtopicModel from "../../model/SubtopicModel";
import style from "./Subtopic.module.css";
import { subtopicAction } from "../../store/reducer/subtopic-reducer";
import { useNavigate } from "react-router-dom";
import QuestionModel from "../../model/QuestionModel";
import { questionAction } from "../../store/reducer/question-reducer";
import useFindRandomQuestionsBySubtopicId from "../../hook/async/use-find-question-list-by-subtopic-id";

type SubtopicProps = {
  subtopic: SubtopicModel;
};

export default function Subtopic({ subtopic }: SubtopicProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [findRandomQuestionsBySubtopicId] =
    useFindRandomQuestionsBySubtopicId();

  const handler = () => {
    findRandomQuestionsBySubtopicId({
      subtopicId: subtopic.id,
      dataHandler: (data: QuestionModel[]) => {
        dispatch(questionAction.loadQuestions(data));
      },
    });
    dispatch(subtopicAction.selectSubtopic(subtopic));
    navigate("../questions");
  };

  return (
    <p onClick={handler} className={style["subtopic-name"]}>
      {subtopic.name}
    </p>
  );
}
