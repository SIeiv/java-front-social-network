import {AxiosPromise} from "axios";
import {axiosInstance} from "@/api/instance.ts";
import endpoints from "@/api/endpoints.ts";
import {IGetFeedResponse, IGetRecsResponse} from "@/api/feed/types.ts";

export const getFeed = (): AxiosPromise<IGetFeedResponse> =>
    axiosInstance.get(endpoints.FEED.GET_FEED);

export const getRecommended = (): AxiosPromise<IGetRecsResponse> =>
    axiosInstance.get(endpoints.FEED.GET_RECS);