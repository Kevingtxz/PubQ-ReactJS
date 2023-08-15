import style from "./SubtopicList.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Subtopic from "../Subtopic/Subtopic";
import { useDispatch } from "react-redux";
import useFindSubtopicList from "../../hook/async/use-find-subtopic-list";
import { useEffect } from "react";
import SubtopicModel from "../../model/SubtopicModel";
import { subtopicAction } from "../../store/reducer/subtopic-reducer";

export default function SubtopicList(): JSX.Element {
  const dispatch = useDispatch();
  const [findSubtopicList] = useFindSubtopicList();
  const topicSelected = useSelector((state: RootState) => {
    return state.topicReducer.topicSelected;
  });
  const subtopicList = useSelector((state: RootState) => {
    return state.subtopicReducer.subtopicList;
  });

  useEffect(() => {
    if (topicSelected) {
      findSubtopicList({
        topicId: topicSelected.id,
        dataHandler: (data: SubtopicModel[]) => {
          dispatch(subtopicAction.loadSubtopics(data));
        },
      });
    }
  }, [dispatch, findSubtopicList, topicSelected]);

  if (!topicSelected) {
    return <></>;
  }

  const subtopicListJsx = subtopicList.map((item) => {
    return (
      <div className={style["grid-item"]} key={item.id}>
        <Subtopic key={item.id} subtopic={item} />
      </div>
    );
  });

  return (
    <div className={style["container"]}>
      <div className={style["flex"]}>
        <p className={style["topic-selected"]}>{topicSelected.name}</p>
      </div>
      <div className={style["grid"]}>{subtopicListJsx}</div>
    </div>
  );
}
