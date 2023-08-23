import axios from "axios";

const api = axios.create({
  baseURL: new URL("/api/graphql", process.env.NEXT_PUBLIC_APP_URL).toString(),
  method: "POST",
});

export default api;
