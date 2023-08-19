import { createBrowserRouter } from "react-router-dom";
import ErrorHandler from "./component/ErrorHandler/ErrorHandler";
import TopicPage from "./page/TopicPage/TopicPage";
import QuestionPage from "./page/QuestionPage/QuestionPage";

const topicPageConfig = {
  path: "/",
  element: <TopicPage />,
  errorElement: <ErrorHandler />,
};

const questionPageConfig = {
  path: "/questions",
  element: <QuestionPage />,
  errorElement: <ErrorHandler />,
};

const router = createBrowserRouter([topicPageConfig, questionPageConfig]);

export { topicPageConfig, questionPageConfig, router };
