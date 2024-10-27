import axios from "axios";
import { ServerURL } from "../Server/Service";


export const getJourneydataFromPNR = (pnr)=>{
    console.log(`https://util.saarthii.tech/train/pnr/${pnr}`)
    return axios.get(`https://util.saarthii.tech/train/pnr/${pnr}`)
}

import apiClient from "../interceptor-axios/axiosInterceptor";

export const getJourneyDataForUser = async () => {
  try {
    const response = await apiClient.get('/journey/journeyType/train');
    return response.data
  } catch (error) {
    return error
  }
};