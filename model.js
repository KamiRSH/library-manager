import { FileSys } from "./repo/file_system.js"
const fileSys = new FileSys()

class User{
    constructor(id, fullName, password, birthDate, phone, email){
        this.id = id
        this.name = fullName
        this.pass = password
        this.birth = birthDate
        this.phone = phone
        this.email = email
        this.token = null
        this.role = null
    }
}

class Book{
  constructor(id, title, author, publishYear, price){
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

    jFile_to_objUsers(){
        jFile = fileSys.read("./repo/users.json")
        const li =[]
        for (const detail of jFile){
            li.push(new User(detail.id, detail.fullName, detail.password, detail.birthDate, detail.phone, detail.email))
        }
        return li
    }

    objUsers_to_jFile(objUsers){
        const li = []
        for (const user of objUsers){
            li.push({...user})
        }
        fileSys.write("./repo/users.json", li)
        return
    }

    jFile_to_objBooks(){
        const jFile = fileSys.read("./repo/books.json")
        const li = []
        for (const detail of jFile){
            li.push(new Book(detail.id, detail.title, detail.author, detail.publishYear, detail.price))
        }
        return li
    }

    objBooks_to_jBooks(objBooks){
        const li = []
        for (const book of objBooks){
            li.push({...book})
        }
        fileSys.write("./repo/books.json", li)
        return
    }User

    jDetailToObjUser(detail){
        return new User(detail.id, detail.fullName, detail.password, detail.birthDate, detail.phone, detail.email)
    }
    
}