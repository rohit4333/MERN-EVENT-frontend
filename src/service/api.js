import axios from "axios";

import { API_NOTIFICATION_MSGS, API_SERVICE_URLS } from "../constants/config";
import { getType } from "../utils/common-utils";
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  // in case of Successful request..
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  // in case of failed request..
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  // in case of Successful repsonse..
  function (success) {
    // loader can be stopped here..
    return processResponse(success);
  },
  //in case of failed response..
  function (error) {
    //loader can be  stopped here..
    return Promise.reject(processError(error));
    //return processError(error);
  }
);

/////////////////////
// if success-> return {isSuccess: true, data: Object};
// if fail-> return {isFailure: true, status: String, msg: String, code: int}
/////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    console.log("response with 400/500");
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

/////////////////////
// if success-> return {isSuccess: true, data: Object};
// if fail-> return {isFailure: true, status: String, msg: String, code: int}
/////////////////////
const processError = (error) => {
  // request successful.. response with status other than 200..
  if (error.response) {
    console.log("Error in Response", error.toJSON());
    return {
      errorType: error.toJSON(),
      isError: true,
      msg: API_NOTIFICATION_MSGS.responseFailure,
      code: error.response.status,
    };
  }
  // request successful but no response from server..
  else if (error.request) {
    console.log("Error in Request", error.toJSON());
    return {
      errorType: error.toJSON(),
      isError: true,
      msg: API_NOTIFICATION_MSGS.requestFailure,
      code: "",
    };
  }
  // request failed from frontend part..
  else {
    console.log("Error in network", error.toJSON());
    return {
      errorType: error.toJSON(),
      isError: true,
      msg: API_NOTIFICATION_MSGS.networkError,
      code: "",
    };
  }
};

const API = {};
for (const [key, value] of Object.entries(API_SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      TYPE: getType(value, body),
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentage);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentage);
        }
      },
    });
}

export { API };
