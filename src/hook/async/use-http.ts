import { useCallback, useState } from "react";
import envConfig from "../../config/envConfig";

export enum MethodsEnum {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export enum UrlEnum {
  TOPICS = "api/v1/topics",
  SUGGESTION = "api/v1/suggestions",
  SUBTOPICS_BY_TOPIC = "api/v1/subtopics/topic=",
  QUESTIONS_BY_SUBTOPIC = "api/v1/questions/subtopic/",
  QUESTIONS_ANSWEAR_URL = "api/v1/questions/answears/",
  REPORT_QUESTIONS = "api/v1/reports/questions/",
  USER_ME = "api/v1/users/me/",
  STUDY_SERIES_HISTORY = "api/v1/history/series",
}

export type sendRequestProps = {
  url?: string;
  method?: MethodsEnum;
  body?: unknown | unknown[];
  dataHandler?: (data: any) => void;
};

export type useHttpReturn = [
  isLoading: boolean,
  error: unknown,
  sendRequest: ({ url, method, body, dataHandler }: sendRequestProps) => void
];

export default function useHttp(): useHttpReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ url, method, body, dataHandler }: sendRequestProps) => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("Access-Control-Allow-Credentials", "true");

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch((url = envConfig.API_URL + url), {
          headers: headers,
          method: method ? method : MethodsEnum.GET,
          credentials: "include",
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Request faild");
        }

        const data = await response.json();
        if (dataHandler) {
          dataHandler(data);
        }
      } catch (err: unknown) {
        console.log(err);
      }
      setIsLoading(false);
    },
    []
  );

  return [isLoading, error, sendRequest] as useHttpReturn;
}
