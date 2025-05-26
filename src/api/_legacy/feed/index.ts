import {AxiosPromise} from "axios";
import {axiosInstance} from "@/api/instance.ts";
import endpoints from "@/api/endpoints.ts";
import {IGetFeedResponse, IGetRecsResponse} from "@/api/feed/types.ts";

export const getFeed = (size: number, page: number): AxiosPromise<IGetFeedResponse> =>
    axiosInstance.get(endpoints.FEED.GET_FEED(size, page));

export const getRecommended = (size: number, page: number): AxiosPromise<IGetRecsResponse> =>
    axiosInstance.get(endpoints.FEED.GET_RECS(size, page));