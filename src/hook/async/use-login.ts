import { useCallback } from "react";
import { MethodsEnum, UrlEnum } from "./use-http";
import envConfig from "../../config/envConfig";
import { authAction } from "../../store/reducer/auth-reducer";
import { useDispatch } from "react-redux";
import LoadService from "../../service/LoadService";

export type useLoginReturn = [login: () => void];

export default function useLogin(): useLoginReturn {
  const dispatch = useDispatch();

  const login = useCallback(async () => {
    try {
      const response = await fetch(envConfig.API_URL + UrlEnum.USER_ME, {
        method: MethodsEnum.GET,
        credentials: "include",
      });
      const user = await response.json();
      if (user?.id) {
        dispatch(authAction.login(user));
      }
    } catch (err) {
      if (LoadService.lastLoadSecBefore(5)) {
        LoadService.setLastLoadNow();
        window.open(`${envConfig.API_URL}api/v1/auth/google/callback`, "_self");
      }
    }
  }, [dispatch]);

  return [login] as useLoginReturn;
}
