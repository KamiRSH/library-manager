import { DTO } from "../model.js"
const dto = new DTO()

export class ManageUser{
    constructor(usersFile) {
        if (ManageUser.instance){
            return ManageUser.instance
        }
        ManageUser.instance = this
        this.file = usersFile
    }

    signUp_userGiveID(detail, file){
        for (const i of Object.values(file))
            if (i["id"] == detail["id"] || i["email"] == detail["email"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        dto.write("./repo/users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    signUp(detail){
        detail.id = this.file.length
        detail.fullName = ""
        detail.birthDate = ""
        detail.email = ""
        if (this.file.length == 0){
            detail.role = "admin"
        }else{
            detail.role = "user"
        }

        for (const i of this.file)
            if (i.phone == detail.phone){
                return null
            }
        // file[Object.keys(file).length + 1] = detail
        this.file.push(detail)
        dto.write("./repo/users.json", this.file)
        return detail
    }

    logIn(detail){
        for (const i of this.file){
            if (detail.phone == i.phone){
                if (detail.password == i.password){
                    // const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
                    return this.file.indexOf(i)
                }else {
                    return -1
                }
            }
        }
        return -1
    }

    view(id, tokens, token){
        if (Number(id) < this.file.length){
            if (token == tokens[id]){
                return this.file[id]
            }else{
                return "wrong token"
            }
        }else{
            return `couldn't find user with id ${id}`
        }
    }

    edit(id, detail, tokens, token){
        if (Number(id) < this.file.length){
            if (token == tokens[id]){
                for (const i of Object.keys(detail)){
                    this.file[id][i] = detail[i]
                }
                dto.write("./repo/users.json", this.file)
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