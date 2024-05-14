import axios from "axios";
import { SignupType } from "../components/Signup";
import { SigninPayload } from "../components/Signin";
import { Userload } from "../components/SearchInput";
 const userid=localStorage.getItem('userid');
// get the env variable from .env file 
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Services of User APIs

export const signup = (payload: SignupType)=>{
    return axios.post(`${BASE_URL}user/signup`,payload)
}

export const signin = (payload: SigninPayload)=>{
    return axios.post(`${BASE_URL}user/signin`,payload)
}
