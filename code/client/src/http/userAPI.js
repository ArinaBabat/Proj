import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, last_name, address, phone, password) => {
    const {data} = await $host.post('api/pacient/registration', {name, last_name, address, phone, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const dlogin = async (doctor_id, password) => {
  const {data} = await $host.post('api/doctor/login', {doctor_id, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const plogin = async (phone, password) => {
  const {data} = await $host.post('api/pacient/login', {phone, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
  const {tab} = await $authHost.get('api/user/auth' );
  return(tab)
}
export const dcheck = async () => {
    const {data} = await $authHost.get('api/doctor/auth' )
      localStorage.setItem('token', data.token)
      return (jwt_decode(data.token))
}
export const pcheck = async () => {
    const {data} = await $authHost.get('api/pacient/auth')
      localStorage.setItem('token', data.token)
      return (jwt_decode(data.token))
}
