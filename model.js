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
