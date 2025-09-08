import { FileSys } from "./repo/file_system.js"

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
        this.objUsersList = []
        this.jUsersList = []

        this.objBooksList = []
        this.jBooksList = []
    }

    jUsers_to_objUsers(jUsers){
        for (const user of jUsers){
            this.objUsersList.push(new User(user))
        }
        return this.objUsersList
    }

    objUsers_to_jUsers(objUsers){
        for (const user of objUsers){
            this.jUsersList.push({...user})
        }
        return this.jUsersList
    }

    jBooks_to_objBooks(jBooks){
        for (const book of jBooks){
            this.objBooksList.push(new Book(book))
        }
        return this.objBooksList
    }

    objBooks_to_jBooks(objUsers){
        for (const user of objUsers){
            this.jUsersList.push({...user})
        }
        return this.jBooksList
    }
    
}