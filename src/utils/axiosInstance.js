import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8070/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default httpClient;