/**
 * Created by zqq(song que / hanyamu) on 2018/10/31.
 */
import Axios from "axios";
import Urls from "./urls.js";
/* axios请求拦截 */
Axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
/* axios响应拦截 */
Axios.interceptors.response.use(
  res => {
    if (res.data.code === 40001) {
      /* 错误code统一处理 */
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

let getAxiosConfig = function(method, url, data, baseUrl, headers) {
  let axiosOptions = {};
  axiosOptions.timeout = 1000 * 60;
  if(baseUrl) {
    axiosOptions.baseURL = baseUrl;
  } else {
    axiosOptions.baseURL = "";
  }
  axiosOptions.method = method;
  if(Urls[url]) {
    axiosOptions.url = Urls[url].url;
  } else {
    axiosOptions.url = url;
  }
  if (method === "get" && data) {
    axiosOptions.params = data;
  }
  if (method === "post" && data) {
    axiosOptions.data = data;
  }
  let needHeaders = {}
  axiosOptions.headers = {...needHeaders, ...headers};
  return axiosOptions;
};

export const axiosGet = (url, data, baseUrl, headers) => {
  return new Promise((resolve, reject) => {
    let axiosConfig = getAxiosConfig("get", url, data, baseUrl, headers);
    Axios(axiosConfig)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const axiosPost = (url, data, baseUrl, headers) => {
  return new Promise((resolve, reject) => {
    let axiosConfig = getAxiosConfig("post", url, data, baseUrl, headers);
    Axios(axiosConfig)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
