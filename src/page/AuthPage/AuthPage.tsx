import style from "./AuthPage.module.css";
import { GOOGLE_AUTH } from "../../util/constant-util";
import { useState } from "react";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const authGoogle = () => {
    setIsLoading(true);
    window.open(GOOGLE_AUTH, "_self");
  };

  return (
    <div className={style["container"]}>
      <button onClick={() => authGoogle()} className={style["google-btn"]}>
        <img className={style["google-img"]} alt="Google Auth" />
        <p>Login with Google</p>
      </button>
      <p className={style["text-carregamento"]}>
        {isLoading && "Carregando..."}
      </p>
    </div>
  );
}
