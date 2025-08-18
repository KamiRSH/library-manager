import { FileSys } from "./file_sys.js"
const fileManager = new FileSys()

export class ManageUser{
    constructor() {
        if (ManageUser.instance){
            return ManageUser.instance
        }
        ManageUser.instance = this
    }

    signUp_userGiveID(detail, file){
        for (const i of Object.values(file))
            if (i["id"] == detail["id"] || i["email"] == detail["email"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        fileManager.write("./users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    signUp(detail, file){
        detail["id"] = Object.keys(file).length + 1
        detail["fullName"] = ""
        detail["birthDate"] = ""
        detail["email"] = ""

        for (const i of Object.values(file))
            if (i["phone"] == detail["phone"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        fileManager.write("./users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    logIn(detail, file){
        for (const i of Object.values(file)){
            if (detail["phone"] == i["phone"]){
                if (detail["password"] == i["password"]){
                    const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
                    return [i["id"], token, `you successfully logged in\nyour token: ${token}`]
                }else {
                    return [null, null, "wrong password"]
                }
            }
        }
        return [null, null, "couldn't find your user\ntry sign up"]
    }

    view(id, file){
        if (Number(id) <= Object.keys(file).length){
            return file[id]
        }else{
            return `couldn't find user with id ${id}`
        }
        
    }

    edit(id, file, detail){
        if (Number(id) <= Object.keys(file).length){
            for (const i of Object.keys(detail)){
                file[id][i] = detail[i]
            }
            fileManager.write("./users.json", file)
            return [file, "your info successfully updated:", file[id]]
        }else{
            return null
        }
    }

}