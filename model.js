import { constants } from "fs"
import fs from "fs/promises"

class User{     //id, fullName, password, birthDate, phone, email, role
    constructor(detail){
        this.id = detail.id     // I guess it should be handle in front; so in this case you should memorize it
        this.name = detail.fullName
        this.pass = detail.password
        this.birth = detail.birthDate
        this.phone = detail.phone
        this.email = detail.email
        this.token = null
        this.role = null
    }
}

class Book {
  constructor(id, title, author, publishYear, price, stock){
    this.id = id
    this.title = title
    this.author = author
    this.year = publishYear
    this.price = price
    this.stock = null
  }
}

export class DTO{
    constructor() {
        if (DTO.instance){
            return DTO.instance
        }
        DTO.instance = this
    }
  
    async read(fileName){
    try{
        const data = await fs.readFile(fileName, "utf8")
        return JSON.parse(data)
    }catch(err){
        console.error("reading error:", err)
    }
  }
  
  async write(fileName, content){
    try{
        await fs.writeFile(fileName, JSON.stringify(content))
    }catch(err){
        console.error("writing error:", err)
    }
  }

  async appnd(fileName, content){
    try{
        await fs.appendFile(fileName, JSON.stringify(content))
    }catch(err){
        console.error("appending error:", err)
    }
  }

  async exist(fileName){
    try{
        await fs.access(fileName, constants.F_OK)
        return true
    }catch(err){
        return false
    }
  }

}