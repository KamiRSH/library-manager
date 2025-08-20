import { FileSys } from "./file_sys.js"
const fileManager = new FileSys()

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
        fileManager.write("./users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    signUp(detail){
        detail.id = this.file.length
        detail.fullName = ""
        detail.birthDate = ""
        detail.email = ""

        for (const i of this.file)
            if (i.phone == detail.phone){
                return null
            }
        // file[Object.keys(file).length + 1] = detail
        this.file.push(detail)
        fileManager.write("./users.json", this.file)
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
        return null
    }

    indexLogIn(detail){
        return this.file.indexOf(detail)
    }

    view(id, tokens, token){
        if (token == tokens[id]){
            if (Number(id) < this.file.length){
                return this.file[id]
            }else{
                return `couldn't find user with id ${id}`
            }
        }else{
            return "wrong token"
        }
    }

    edit(id, detail, tokens, token){
        if (token == tokens[id]){
            if (Number(id) < this.file.length){
                for (const i of Object.keys(detail)){
                    this.file[id][i] = detail[i]
                }console.log(this.file)
                fileManager.write("./users.json", this.file)
                return "your info successfully updated:"
            }else{
                return `couldn't find user with id ${req.params.id}`
            }
        }else{
            return "wrong token"
        }
        
    }

}