import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createSpeciality = async (speciality) => {
    const {data} = await $authHost.post('api/speciality', speciality)
    return data
}

export const fetchSpeciality = async () => {
    const {data} = await $host.get('api/speciality')
    return data
}

export const createCabinet = async (cabinet) => {
    const {data} = await $authHost.post('api/cabinet', cabinet)
    return data
}

export const fetchCabinet = async () => {
    const {data} = await $host.get('api/cabinet', )
    return data
}
export const fetchDoctor = async () => {
    const {data} = await $host.get('api/doctor', )
    return data
}

export const createTimetabte = async (timetable) => {
    const {data} = await $authHost.post('api/timetable', timetable)
    return data
}

export const fetchTimetable = async (cabinetCabinetId, doctorDoctorId, page, limit= 5) => {
    const {data} = await $host.get('api/timetable', {params: {
            cabinetCabinetId, doctorDoctorId, page, limit
        }})
    return data
}
