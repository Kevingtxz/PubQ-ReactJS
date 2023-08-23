import style from "./LoginPage.module.css";
import { useEffect } from "react";
import useHttp, { MethodsEnum, UrlEnum } from "../../hook/async/use-http";
import { authAction } from "../../store/reducer/auth-reducer";
import { useDispatch } from "react-redux";
import UserView from "../../model/dto/view/UserView";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, error, sendRequest] = useHttp();

  useEffect(() => {
    const dataHandler = (data: UserView) => {
      if (data?.id) {
        dispatch(authAction.login(data));
        navigate("/");
      }
    };

    sendRequest({ url: UrlEnum.USER_ME, method: MethodsEnum.GET, dataHandler });
  }, [dispatch, navigate, sendRequest]);

  if (isLoading) return <div className={style["container"]}>Loading...</div>;

  if (error) return <div className={style["container"]}>Erro</div>;

  return <></>;
}
