import axios from "axios";
import { getLSItem, removeLSItem } from "./LocalStorage";
import swal from "sweetalert";

// export const BASE_URL = `${window?.location?.hostname == "localhost" ? "http://localhost:8000/" : "http://shah.webisheet.in/"}`;
// export const BASE_URL = `http://192.168.1.37:8000/`;
export const BASE_URL = `https://shah.webisheet.in/`;
export const Image_BASE_URL = "https://shiv-gas-agency.s3.ap-south-1.amazonaws.com/";

const instance = axios.create({ baseURL: BASE_URL });

const clearLocalStore = () => {
  removeLSItem("user");
  removeLSItem("auth_token");
  removeLSItem("menuList");
  removeLSItem("deviceToken");
}

const onRequestSuccess = (config) => {
  const auth_token = getLSItem("auth_token");
  if (auth_token) config.headers["Authorization"] = auth_token;
  return config;
};

const onRequestFailure = (error) => Promise.reject(error);

const onResponseSuccess = (response) => {
  return response;
};
const onResponseFailure = (error) => {
  if (error.response) {
    if (error.response.status === 400 || error.response.status === 500) {
      swal(error.response.data.message, {
        icon: "error",
        timer: 5000,
      });
    } else if (error.response.status === 401 && error.response.data.message == "Token Signature could not be verified.") {
      swal(error.response.data.message, { icon: "warning", timer: 5000, })
        .then(() => {
          clearLocalStore()
          window.location.reload(false);
        });
    } else if (error.response.status === 401 && error.response.data.message == "Token has expired") {
      swal("Please login again", { icon: "warning", timer: 5000, })
        .then(() => {
          clearLocalStore()
          window.location.reload(false);
        });
    } else if (error.response.status === 401) {
      swal("Something went wrong. Please login again", { icon: "warning", timer: 5000, })
        .then(() => {
          clearLocalStore()
          window.location.reload(false);
        });
    }
    return Promise.reject(error.response);
  }
  else {
    const customMsg = "Server is taking longer time to respond, please try again later.";
    swal(customMsg, { icon: "warning", timer: 5000, })
      .then(() => {
        clearLocalStore()
        window.location.reload(false);
      });
  }
};

instance.interceptors.request.use(onRequestSuccess, onRequestFailure);
instance.interceptors.response.use(onResponseSuccess, onResponseFailure);

export default instance;
