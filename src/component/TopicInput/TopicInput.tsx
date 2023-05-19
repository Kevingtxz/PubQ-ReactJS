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
import { useNavigate } from "react-router-dom";

export default function TopicInput(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState("");
  const [suggestionList, setSuggestionList] = useState([""]);
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
    // navigate("/subtopics");
    setTopicName("");
    setSuggestionList([]);
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
      return setSuggestionList([]);
    }
    const topicListStr = topicList.map((item) => item.name);
    const suggestionAutocompleteList = TopicService.verifyAutocomplete(
      event.target.value,
      topicListStr
    );
    setSuggestionList(suggestionAutocompleteList);
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
              placeholder="Azure AZ900:Security"
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
