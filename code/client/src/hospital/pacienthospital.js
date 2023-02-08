import {makeAutoObservable} from "mobx";
export default class PacientHospital{
  constructor() {
    this._isAuth = false
    this._pacient = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
    console.log('isAuth ',bool)
  }
  setUser(user) {
    this._pacient = user
  }

  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._pacient
  }
}
