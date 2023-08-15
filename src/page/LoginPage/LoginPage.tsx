import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { API_URL } from "../../util/constant-util";

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    if (!isLogged) {
      window.open(API_URL + "api/v1/auth/google/callback", "_self");
    } else {
      navigate("/");
    }
  }, [navigate, isLogged]);

  return <></>;
}
