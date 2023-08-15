import style from "./QuestionPage.module.css";
import QuestionList from "../../component/QuestionList/QuestionList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function QuestionPage(): JSX.Element {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [navigate, isLogged]);

  return (
    <div className={style["container"]}>
      <QuestionList />
    </div>
  );
}
