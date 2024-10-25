import axios from "axios";
import { ServerURL } from "../Server/Service";


export const getJourneydataFromPNR = (pnr)=>{
    console.log(`https://util.saarthii.tech/train/pnr/${pnr}`)
    return axios.get(`https://util.saarthii.tech/train/pnr/${pnr}`)
}
