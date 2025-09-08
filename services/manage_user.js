// import { FileSys } from "../repo/file_system.js"
import { DTO } from "../model.js"
const fileSys = new FileSys()
const dto = new DTO()

export class ManageUser{
    constructor(usersLi) {
        if (ManageUser.instance){
            return ManageUser.instance
        }
        ManageUser.instance = this
        this.usersLi = usersLi
    }

    signUp_userGiveID(detail, file){
        for (const i of Object.values(file))
            if (i["id"] == detail["id"] || i["email"] == detail["email"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        fileSys.write("./repo/users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    signUp(objDetail){
        for (const i of this.usersLi){
            if (i.phone == objDetail.phone){
                return null
            }
        }
        // detail.id = this.usersLi.length
        // detail.fullName = ""
        // detail.birthDate = ""
        // detail.email = ""
        // if (this.usersLi.length == 0){
        //     detail.role = "admin"
        // }else{
        //     detail.role = "user"
        // }

        
        // file[Object.keys(file).length + 1] = detail
        this.usersLi.push(objDetail)
        dto.objUsers_to_jFile(this.usersLi)
        return objDetail
    }

    logIn(detail){
        for (const i of this.usersLi){
            if (detail.phone == i.phone){
                if (detail.password == i.password){
                    // const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
                    return this.usersLi.indexOf(i)
                }else {
                    return -1
                }
            }
        }
        return -1
    }

    view(id, tokens, token){
        if (Number(id) < this.usersLi.length){
            if (token == tokens[id]){
                return this.usersLi[id]
            }else{
                return "wrong token"
            }
        }else{
            return `couldn't find user with id ${id}`
        }
    }

    edit(id, detail, tokens, token){
        if (Number(id) < this.usersLi.length){
            if (token == tokens[id]){
                for (const i of Object.keys(detail)){
                    this.usersLi[id][i] = detail[i]
                }
                fileSys.write("./repo/users.json", this.usersLi)
                return "your info successfully updated:"
            }else{
                return "wrong token"
            }
        }else{
            return `couldn't find user with id ${id}`
        }
    }

    beAdmin(tokens, token){
        if (token == tokens[0]){
            return true
        }else{
            return false
        }
    }

}