import {makeAutoObservable} from "mobx";
export default class CabHospital{
  constructor() {
    this._isAuth = false
    this._pacient = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setUser(pacient) {
    this._pacient = pacient
  }

  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._pacient
  }
}
