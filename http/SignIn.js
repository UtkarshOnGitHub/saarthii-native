import axios from "axios";
import { ServerURL } from "../Server/Service";


export const SignInFromAxios = (payload)=>{
    return axios.post(`${ServerURL}api/authentication/login`,payload)
}
