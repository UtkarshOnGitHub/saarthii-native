import axios from "axios";
import { ServerURL } from "../Server/Service";


export const SignInFromAxios = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/login`,payload)
}

export const SignUpFromAxios = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/signup`,payload)
}

export const sendVerificationEmail = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/sendCode`,payload)
}

export const verifyVerificationCode = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/verifyCode`,payload)
}