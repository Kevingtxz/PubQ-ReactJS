import { useDispatch } from "react-redux";
import useHttp, { UrlEnum } from "../../hook/async/use-http";
import SubtopicModel from "../../model/SubtopicModel";
import style from "./Subtopic.module.css";
import { subtopicAction } from "../../store/reducer/subtopic-reducer";
import { useNavigate } from "react-router-dom";

type SubtopicProps = {
  subtopic: SubtopicModel;
};

export default function Subtopic({ subtopic }: SubtopicProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = () => {
    dispatch(subtopicAction.selectSubtopic(subtopic));
    navigate("../questions");
  };

  return (
    <p onClick={handler} className={style["subtopic-name"]}>
      {subtopic.name}
    </p>
  );
}
