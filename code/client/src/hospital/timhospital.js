import {makeAutoObservable} from "mobx";

export default class TimHospital {
    constructor() {
        this._spec = []
        this._cab = []
        this._doc = []
        this._tim = []
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
