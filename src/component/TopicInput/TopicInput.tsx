import { JSX } from "react/jsx-runtime";
import style from "./TopicInput.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopicService from "../../service/TopicService";
import { useDispatch } from "react-redux";
import { topicAction } from "../../store/reducer/topic-reducer";
import TopicModel from "../../model/TopicModel";
import useFindTopic from "../../hook/async/use-find-topic";

export default function TopicInput(): JSX.Element {
  const dispatch = useDispatch();
  const [topicName, setTopicName] = useState("");
  const [suggestionList, setTopicAutocompleteList] = useState([""]);
  const [findTopic] = useFindTopic();
  const topicList = useSelector((state: RootState) => {
    return state.topicReducer.topicList;
  });

  const findTopicFunc = (topicName: string) => {
    findTopic({
      topicName: topicName.trim(),
      topicList,
      dataHandler: (data: TopicModel) => {
        dispatch(topicAction.selectTopic(data));
      },
    });
    setTopicName("");
    setTopicAutocompleteList([]);
  };

  const handler = async (event: FormEvent) => {
    event.preventDefault();

    if (topicName.length < 1) {
      return;
    }

    findTopicFunc(topicName);
  };

  const onChangeFunction = (event: ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value);
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

  const suggestionListJsx = (
    <div className={style["autocomplete-itens"]}>
      {suggestionList[0] === "" ||
        suggestionList.map((item, idx) => (
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
              className={style["topic-input"]}
              type="text"
              placeholder="AZ900: Azure Fundamentals"
              value={topicName}
              onChange={onChangeFunction}
              maxLength={100}
            />
          </label>
          <button type="submit" className={style["search-icon"]} />
        </div>
      </form>
      {suggestionListJsx}
    </div>
  );
}
