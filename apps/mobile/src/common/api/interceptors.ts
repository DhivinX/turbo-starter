import { AxiosResponse } from 'axios';
import { timeout } from 'shared';
import { $axios } from './client';
import { ResponseError } from './response-error';

type ResponseSuccessCallback = (response: AxiosResponse) => void;
type ResponseErrorCallback = (error: ResponseError) => void;

interface CallbackTrigger {
  responseSuccess: ResponseSuccessCallback;
  responseError: ResponseErrorCallback;
}

const callbackTrigger: CallbackTrigger = {
  responseSuccess: null,
  responseError: null,
};

$axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (callbackTrigger.responseSuccess) callbackTrigger.responseSuccess(response);
    return response;
  },

  async (error: ResponseError) => {
    if (error.response && error.response.status !== 0) {
      error.isNetworkError = false;
      if (callbackTrigger.responseError) callbackTrigger.responseError(error);
      return Promise.reject(error);
    } else {
      error.isNetworkError = true;
      if (callbackTrigger.responseError) callbackTrigger.responseError(error);
      await timeout(5000);
      return await $axios.request(error.config);
    }
  },
);

export function onResponseSuccess(callback: ResponseSuccessCallback): void {
  callbackTrigger.responseSuccess = callback;
}

export function onResponseError(callback: ResponseErrorCallback): void {
  callbackTrigger.responseError = callback;
}
