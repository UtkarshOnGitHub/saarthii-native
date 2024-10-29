import axios from "axios";
import { ServerURL } from "../Server/Service";


import apiClient from "../interceptor-axios/axiosInterceptor";

export const getJourneyDataForUser = async () => {
  try {
    const response = await apiClient.get('/journey/journeyType/train');
    return response.data
  } catch (error) {
    return error
  }
};


export const addJourneyDataForUser = async (payload) => {
  try {
    const response = await apiClient.post('/journey/journeyType/train',payload);
    return response.data
  } catch (error) {
    return error
  }
};