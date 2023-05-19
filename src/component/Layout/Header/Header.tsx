import { JSX } from "react/jsx-runtime";
import style from "./Header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={style["header"]}>
      <nav className={style["nav"]}>
        <p className={style["logo"]}>PubQ</p>
      </nav>
    </header>
  );
}
