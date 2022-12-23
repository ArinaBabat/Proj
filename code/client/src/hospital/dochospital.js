import {makeAutoObservable} from "mobx";
export default class DocHospital{
  constructor() {
    this._isDoc = false
    this._isHp = false
    this._doc = {}
    makeAutoObservable(this)
  }
  setIsDoc(bool) {
    this._isDoc = bool
  }
  setIsHp(bool) {
    this._isHp = bool
  }
  setDoc(doc) {
    this._doc = doc
  }

  get isDoc() {
    return this._isDoc
  }
  get isHp() {
    return this._isHp
  }
  get doc() {
    return this._doc
  }
}
