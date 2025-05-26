import axios from "axios";
import endpoints from "@/api/endpoints.ts";

export const  axiosInstance = axios.create({});

const urlsSkipAuth = [endpoints.AUTH.LOGIN, endpoints.AUTH.REGISTER];

axiosInstance.interceptors.request.use(async (config) => {
    /*config.withCredentials = true;*/
    /*config.headers.contentType = "application/json";*/
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;

    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config;
    }

    return config;
})