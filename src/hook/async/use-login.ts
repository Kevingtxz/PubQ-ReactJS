import { MethodsEnum, UrlEnum } from "./use-http";
import UserModel from "../../model/dto/view/UserView";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/reducer/auth-reducer";
import envConfig from "../../config/envConfig";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

export type useUseLoginProps = {
  dataHandler: (data: any) => void;
};
export type useUseLoginReturn = [useLogin: () => void];

export default function useLogin(): useUseLoginReturn {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  const login = async () => {
    if (!isLogged) {
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
        navigate("/auth");
      }
    }
  };

  return [login] as useUseLoginReturn;
}
