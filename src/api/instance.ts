import axios from "axios";
import endpoints from "@/api/endpoints.ts";

export const  axiosInstance = axios.create({});

const urlsSkipAuth = [endpoints.AUTH.LOGIN];

axiosInstance.interceptors.request.use(async (config) => {
    config.withCredentials = true;
    /*config.headers.contentType = "application/json";*/

    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config;
    }

    return config;
})