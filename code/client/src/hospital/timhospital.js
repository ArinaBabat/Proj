import {makeAutoObservable} from "mobx";

export default class TimHospital {
    constructor() {
        this._spec = [
          {speciality_id:1, name:'sp1'},
          {speciality_id:2, name:'sp2'}
        ]
        this._cab = [
          {id:1, number:11,specialitySpecialityId:1},
          {id:2, number:22,specialitySpecialityId:1},
          {id:3, number:33,specialitySpecialityId:2},
          {id:4, number:44,specialitySpecialityId:2}
        ]
        this._doc = [
        {doctor_id:1, first_name:'sdfa', last_name:'ascs', specialitySpecialityId:1},
        {doctor_id:2, first_name:'ssdvsd', last_name:'sdvf', specialitySpecialityId:2},
        {doctor_id:3, first_name:'erh', last_name:'gfmkg', specialitySpecialityId:1},
        {doctor_id:4, first_name:'sdvdf', last_name:'cfhy', specialitySpecialityId:2},
        ]
        this._tim = [
          {timetable_id: 1, day: 'q', start_of_admission: 1231, end_of_reception:13541, doctorDoctorId:1, cabinetCabinetId:1},
          {timetable_id: 2, day: 'w', start_of_admission: 1232, end_of_reception:13542, doctorDoctorId:2, cabinetCabinetId:2},
          {timetable_id: 3, day: 'e', start_of_admission: 1233, end_of_reception:13543, doctorDoctorId:3, cabinetCabinetId:3},
          {timetable_id: 4, day: 'r', start_of_admission: 1234, end_of_reception:13544, doctorDoctorId:4, cabinetCabinetId:4},
          {timetable_id: 5, day: 't', start_of_admission: 1235, end_of_reception:13545, doctorDoctorId:1, cabinetCabinetId:3},
          {timetable_id: 6, day: 'y', start_of_admission: 1236, end_of_reception:13546, doctorDoctorId:2, cabinetCabinetId:2},
          {timetable_id: 7, day: 'u', start_of_admission: 1237, end_of_reception:13547, doctorDoctorId:3, cabinetCabinetId:1},
        ]
        makeAutoObservable(this)
    }
    setSpec(spec) {
        this._spec = spec
    }
    setCab(cab) {
        this._cab = cab
    }
    setDoc(doc) {
        this._doc = doc
    }

    setTim(tim) {
        this._tim = tim
    }


    get spec() {
        return this._spec
    }
    get cab() {
        return this._cab
    }
    get doc() {
        return this._doc
    }
    get tim() {
        return this._tim
    }

}
