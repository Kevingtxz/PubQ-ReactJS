import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useLogin from "../../hook/async/use-login";

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [login] = useLogin();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    } else {
      login();
    }
  }, [navigate, isLogged, login]);

  return <></>;
}
