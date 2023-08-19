import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
    navigate("/");
  }, [navigate]);

  return <></>;
}
