import { randomInt } from "node:crypto"

export class Tools{
    constructor() {
        if (Tools.instance){
            return Tools.instance
        }
        Tools.instance = this
    }

    generate16digits(){
        const part1 = randomInt(10 ** 7, 10 ** 8 - 1)
        const part2 = randomInt(10 ** 7, 10 ** 8 - 1)
        return Number(part1.toString() + part2.toString())
    }

    beAdmin(usersLi, token){
        for(const i of usersLi){
            if(i.role == "admin"){
                if(i.token == token){
                    return true
                }else{
                    return false
                }
            }
            return false
        }
        // if(usersLi[0].token == token){
        //     return true
        // }else{
        //     return false
        // }
    }

    indexOfId(objLi, id){
        for(const i of objLi){
            if(i.id == id){
                return objLi.indexOf(i)
            }
        }
        return -1
    }
}
