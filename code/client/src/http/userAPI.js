import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const login = async (doctor_id, password) => {

  const {data} = await $host.post('api/doctor/login', {doctor_id, password})
  //localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
    //const {data} = await $authHost.get('api/user/auth' )
    //localStorage.setItem('token', data.token)
    return //jwt_decode(data.token)
}
