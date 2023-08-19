import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import useLogin from "./hook/async/use-login";

export default function App() {
  const [login] = useLogin();
  useEffect(() => {
    login();
  }, [login]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
