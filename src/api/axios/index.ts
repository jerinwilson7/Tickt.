import axios from "axios";
import { server } from "../../server";

export const axiosInstance = axios.create({
    baseURL:server,
    headers:{
        "Content-Type":"application/json"
    }
})