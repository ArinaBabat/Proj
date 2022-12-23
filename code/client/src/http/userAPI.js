import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const login = async (doctor_id, password) => {
  const {data} = await $host.post('api/doctor/login', {doctor_id, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const dcheck = async () => {
    const {data} = await $authHost.get('api/doctor/auth' )
    //console.log("ddata = ",jwt_decode(ddata.token))
    //const {pdata} = await $authHost.get('api/pacient/auth')
    //console.log("pdata = ",jwt_decode(pdata.token))
    //if (ddata){
      localStorage.setItem('token', data.token)
      //console.log("ddata = ",ddata)
      return jwt_decode(data.token)
    //}
    //localStorage.setItem('token', pdata.token)
    //return jwt_decode(pdata.token)
}

export const pcheck = async () => {
//    const {data} = await $authHost.get('api/doctor/auth' )
    //console.log("ddata = ",jwt_decode(ddata.token))
    const {data} = await $authHost.get('api/pacient/auth')
    //console.log("pdata = ",jwt_decode(pdata.token))
    //if (ddata){
      localStorage.setItem('token', data.token)
      //console.log("ddata = ",ddata)
      return jwt_decode(data.token)
    //}
    //localStorage.setItem('token', pdata.token)
    //return jwt_decode(pdata.token)
}
