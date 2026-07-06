"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

export default function useAxios() {
  return axiosInstance;
}