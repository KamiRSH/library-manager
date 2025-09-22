// import { FileSys } from "../repo/file_system.js"
import { DTO } from "../model.js"
import { Tools } from "./tools.js"
// const fileSys = new FileSys()
const dto = new DTO()
const tools = new Tools()

export class ManageUser{
    constructor() {
        if (ManageUser.instance){
            return ManageUser.instance
        }
        ManageUser.instance = this
        this.usersLi = []
        
        
    }

    async init(){
        this.usersLi = await dto.jFile_to_objUsers()
        dto.objUsers_to_jFile(this.usersLi)     // resetting tokens
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

    signUp(objUser){
        for(const i of this.usersLi){
            if(i.phone == objUser.phone){
                return null
            }
        }
        // set id and role
        if(this.usersLi.length == 0){
            objUser.id = 0
            objUser.role = "admin"
        }else{
            const lastId = this.usersLi[this.usersLi.length -1].id
            objUser.id = lastId + 1
            objUser.role = "user"
        }   
        this.usersLi.push(objUser)
        dto.objUsers_to_jFile(this.usersLi)
        console.log(this.usersLi)
        return objUser
    }

    logIn(objDetail, token){
        for (const i of this.usersLi){
            if (objDetail.phone == i.phone){
                if (objDetail.password == i.password){
                    const index = this.usersLi.indexOf(i)
                    this.usersLi[index].token = token
                    dto.objUsers_to_jFile(this.usersLi)
                    return true
                }else {
                    return false
                }
            }
        }
        return false
    }

    view(id, token){
        const index = tools.indexOfId(this.usersLi, id)
        if (index != -1){
            if(this.usersLi[index].token == token){
                return this.usersLi[index]
            }else{
                return "wrong token"
            }
        }else{
            return `couldn't find user with id ${id}`
        }
    }

    edit(id, detail, token){
        const index = tools.indexOfId(this.usersLi, id)
        if(index != -1){
            if(this.usersLi[index].token == token){
                for(const i of Object.keys(detail)){
                    if(detail[i]){
                        this.usersLi[index][i] = detail[i]
                    }
                    // console.log(i)
                    // console.log(this.usersLi[index][i])
                    // console.log(detail)
                    // console.log(detail[i])
                    // console.log(this.usersLi[index])
                }
                dto.objUsers_to_jFile(this.usersLi)
                return "your info successfully updated:"
            }else{
                return "wrong token"
            }
        }else{
            return `couldn't find user with id ${id}`
        }
    }

}
