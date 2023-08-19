import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import useLogin from "./hook/async/use-login";

export default function App() {
  const [login] = useLogin();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

  useEffect(() => {
    (async () => {
      if (!isLogged) {
        setTimeout(login, 500);
      }
    })();
  }, [isLogged, login]);

  if (!isLogged) {
    return <></>;
  } else {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    );
  }
}
