import axios, { type AxiosError, HttpStatusCode } from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  timeout: 60000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    const errorData = error.response?.data;

    if (error.status === HttpStatusCode.InternalServerError) {
      // TODO: Handle internal server error
    }

    return Promise.reject(errorData);
  },
);

export default apiClient;
