import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import QuestionAnswearForm from "../../model/dto/form/QuestionAnswear";
import envConfig from "../../config/envConfig";
import { authAction } from "../../store/reducer/auth-reducer";
import { useDispatch } from "react-redux";

export type useLoginReturn = [login: () => void];

export default function useLogin(): useLoginReturn {
  const dispatch = useDispatch();

  const login = useCallback(async () => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Access-Control-Allow-Credentials", "true");

    try {
      const response = await fetch(envConfig.API_URL + UrlEnum.USER_ME, {
        headers,
        method: MethodsEnum.GET,
        credentials: "include",
      });
      const user = await response.json();

      if (user?.id) {
        dispatch(authAction.login(user));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return [login] as useLoginReturn;
}
