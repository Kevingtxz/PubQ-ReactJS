import { JSX } from "react/jsx-runtime";
import style from "./TopicInput.module.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopicService from "../../service/TopicService";
import { useDispatch } from "react-redux";
import { topicAction } from "../../store/reducer/topic-reducer";
import TopicModel from "../../model/TopicModel";
import useFindTopic from "../../hook/async/use-find-topic";

export default function TopicInput(): JSX.Element {
  const dispatch = useDispatch();
  const topicName = useRef("");
  const [autocompleteList, setTopicAutocompleteList] = useState([""]);
  const [findTopic] = useFindTopic();
  const topicList = useSelector((state: RootState) => {
    return state.topicReducer.topicList;
  });

  const findTopicFunc = (topic: string) => {
    findTopic({
      topicName: topic.trim(),
      topicList,
      dataHandler: (data: TopicModel) => {
        dispatch(topicAction.selectTopic(data));
      },
    });
    topicName.current = "";
    setTopicAutocompleteList([]);
  };

  const handler = async (event: FormEvent) => {
    event.preventDefault();

    if (topicName.current.length < 1) {
      return;
    }

    findTopicFunc(topicName.current);
  };

  const inputOutMouse = () => {
    setTopicAutocompleteList([]);
  };

  const inputOnClick = () => {
    const topicListStr = topicList.map((item) => item.name);
    setTopicAutocompleteList(topicListStr);
  };

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    topicName.current = event.target.value;
    if (event.target.value.length === 0) {
      return setTopicAutocompleteList([]);
    }
    const topicListStr = topicList.map((item) => item.name);
    const topicAutocompleteList = TopicService.verifyAutocomplete(
      event.target.value,
      topicListStr
    );
    setTopicAutocompleteList(topicAutocompleteList);
  };

  const autocompleteFunction = (topicNameAutocompleted: string) => {
    findTopicFunc(topicNameAutocompleted);
  };

  const autocompleteListJsx = (
    <div onMouseLeave={inputOutMouse} className={style["autocomplete-itens"]}>
      {autocompleteList[0] === "" ||
        autocompleteList.map((item, idx) => (
          <p
            key={idx}
            onClick={() => autocompleteFunction(item)}
            className={style["autocomplete-item"]}
          >
            {item}
          </p>
        ))}
    </div>
  );

  return (
    <div className={style["container"]}>
      <form onSubmit={handler}>
        <div className={style["label-container"]}>
          <label>
            <input
              onMouseEnter={inputOnClick}
              onChange={inputOnChange}
              className={style["topic-input"]}
              type="text"
              placeholder="AZ900: Azure Fundamentals"
              value={topicName.current}
              maxLength={100}
            />
          </label>
          <button type="submit" className={style["search-icon"]} />
        </div>
      </form>
      {autocompleteListJsx}
    </div>
  );
}
