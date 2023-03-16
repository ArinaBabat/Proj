import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//export const registration = async (first_name, last_name, address, phone, password, doctorDoctorId) => {
//    const {data} = await $host.post('api/pacient/registration', {first_name, last_name, address, phone, password, doctorDoctorId})
//    localStorage.setItem('token', data.token)
//    return jwt_decode(data.token)
//}

export const dlogin = async (doctor_id, password) => {
  const {data} = await $host.post('api/doctor/login', {doctor_id, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const plogin = async () => {
  const {data} = await $host.get('api/pacient/get')
  return (data.user)
}

export const dcheck = async () => {
    const {data} = await $authHost.get('api/doctor/auth' )
    if(data.message) {
      return null;
    }
    localStorage.setItem('token', data.token)
    return (jwt_decode(data.token))
}
export const pcheck = async () => {
  const {data} = await $authHost.get('api/pacient/get')
  if(data.message) {
    return null;
  }
  return (data.user)
}
export const plogout = async () => {
    const {data} = await $authHost.get('api/pacient/logout' )
    return (data)
}
