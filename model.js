import { FileSys } from "./repo/file_system.js"
const fileSys = new FileSys()

// fileSys.exist("./repo/users.json")
// fileSys.exist("./repo/books.json")

class User{
    constructor(id, fullName, password, birthDate, phone, email, role){
        this.id = id
        this.fullName = fullName
        this.password = password
        this.birthDate = birthDate
        this.phone = phone
        this.email = email
        this.token = null
        this.role = role
    }
}

class Book{
  constructor(id, title, author, publishYear, price){
    this.id = id
    this.title = title
    this.author = author
    this.publishYear = publishYear
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

    async jFile_to_objUsers(){
        const jFile = await fileSys.read("./repo/users.json")
        const li =[]
        for (const detail of jFile){
            // li.push(new User(detail.id, detail.fullName, detail.password, detail.birthDate, detail.phone, detail.email))
            li.push(this.jDetailToObjUser(detail))
        }
        return li
    }

    async objUsers_to_jFile(objUsers){
        const li = []
        for (const user of objUsers){
            li.push({...user})
        }
        await fileSys.write("./repo/users.json", li)
        return
    }

    async jFile_to_objBooks(){
        const jFile = await fileSys.read("./repo/books.json")
        const li = []
        for(const detail of jFile){
            // li.push(new Book(detail.id, detail.title, detail.author, detail.publishYear, detail.price))
            li.push(this.jDetailToObjBooks(detail))
        }
        return li
    }

    async objBooks_to_jFile(objBooks){
        const li = []
        for (const book of objBooks){
            li.push({...book})
        }
        await fileSys.write("./repo/books.json", li)
        return
    }

    jDetailToObjUser(detail){
        return new User(detail.id, detail.fullName, detail.password,
             detail.birthDate, detail.phone, detail.email, detail.role)
    }

    jDetailToObjBooks(detail){
        return new Book(detail.id, detail.title, detail.author, detail.publishYear, detail.price)
    }
    
}
