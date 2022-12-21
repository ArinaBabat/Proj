import {makeAutoObservable} from "mobx";
export default class UserHospital{
  constructor() {
    this._isAuth = true
    this._isDoc = true
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setIsDoc(bool) {
    this._isDoc = bool
  }
  setUser(user) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }
  get isDoc() {
    return this._isDoc
  }
  get user() {
    return this._user
  }
}
