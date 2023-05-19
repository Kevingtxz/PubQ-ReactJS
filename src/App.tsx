import { Suspense } from "react";
import Header from "./component/Layout/Header/Header";
import useLoad from "./hook/async/use-load";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  useLoad();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
