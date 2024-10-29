import axios from "axios";
import { ServerURL } from "../Server/Service";


// export const SignInFromAxios = (payload)=>{
//     return axios.post(`${ServerURL}api/authentication/login`,payload)
// }

// export const SignUpFromAxios = (payload)=>{
//     return axios.post(`${ServerURL}api/authentication/signup`,payload)
// }

export const sendVerificationEmail = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/sendCode`,payload)
}

export const verifyVerificationCode = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/verifyCode`,payload)
}

import apiClient from "../interceptor-axios/axiosInterceptor";

export const SignInFromAxios = async (payload) => {
  try {
    const response = await apiClient.post('/authentication/login',payload);
    return response
  } catch (error) {
    return error
  }
};

export const SignUpFromAxios = async (payload) => {
    try {
      const response = await apiClient.post('/authentication/signup',payload);
      return response
    } catch (error) {
      return error
    }
  };