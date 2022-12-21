import {makeAutoObservable} from "mobx";
export default class UserHospital{
  constructor() {
    this._isAuth = false
    this._isDoc = false
    this._isHp = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setIsDoc(bool) {
    this._isDoc = bool
  }
  setIsHp(bool) {
    this._isHp = bool
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
  get isHp() {
    return this._isHp
  }
  get user() {
    return this._user
  }
}
