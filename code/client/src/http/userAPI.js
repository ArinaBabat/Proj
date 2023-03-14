import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (first_name, last_name, address, phone, password, doctorDoctorId) => {
    const {data} = await $host.post('api/pacient/registration', {first_name, last_name, address, phone, password, doctorDoctorId})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const dlogin = async (doctor_id, password) => {
  const {data} = await $host.post('api/doctor/login', {doctor_id, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const plogin = async () => {
  const {user} = await $authHost.get('api/pacient/get')
  console.log(user)
    //localStorage.setItem('token', data.token)
    return (user)
}


export const dcheck = async () => {
    const {data} = await $authHost.get('api/doctor/auth' )
      localStorage.setItem('token', data.token)
      return (jwt_decode(data.token))
}
