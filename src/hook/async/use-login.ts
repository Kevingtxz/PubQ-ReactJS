import { MethodsEnum, UrlEnum } from "./use-http";
import UserModel from "../../model/dto/view/UserView";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/reducer/auth-reducer";
import envConfig from "../../config/envConfig";

export type useUseLoginProps = {
  dataHandler: (data: any) => void;
};
export type useUseLoginReturn = [useLogin: () => void];

export default function useLogin(): useUseLoginReturn {
  const dispatch = useDispatch();
  const login = async () => {
    let user: UserModel | undefined;

    try {
      const response = await fetch(envConfig.API_URL + UrlEnum.USER_ME, {
        method: MethodsEnum.GET,
        credentials: "include",
      });
      user = await response.json();
    } catch (err) {}

    if (user) {
      dispatch(authAction.login(user));
    } else {
      window.open(envConfig.API_URL + "api/v1/auth/google/callback", "_self");
    }
  };

  return [login] as useUseLoginReturn;
}
