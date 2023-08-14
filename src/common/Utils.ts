import {getById} from "./domUtils";

export class Utils{
    private static shared: Utils


    constructor() {
        if(Utils.shared) return Utils.shared
        else Utils.shared = this
    }

    completedLoading = () =>{
        getById('loading').remove()
    }
}