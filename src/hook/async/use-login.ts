import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import UserModel from "../../model/dto/view/UserView";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/reducer/auth-reducer";
import { API_URL } from "../../util/constant-util";

export type useUseLoginProps = {
  dataHandler: (data: any) => void;
};
export type useUseLoginReturn = [useLogin: () => void];

export default function useLogin(): useUseLoginReturn {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useLogin = useCallback(async () => {
    let user: UserModel | undefined;

    try {
      const response = await fetch(API_URL + UrlEnum.USER_ME, {
        method: MethodsEnum.GET,
        credentials: "include",
      });
      user = await response.json();
    } catch (err) {}

    if (user) {
      dispatch(authAction.login(user));
      navigate("/");
    }
  }, [dispatch, navigate]);

  return [useLogin] as useUseLoginReturn;
}
