import express from "express"
// import { access } from "fs"
import fs from "fs/promises"
import { constants } from "fs"
const app = express()
app.use(express.json())

class User{
    constructor(id, fullName, password, birthDate, phone, email){
        this.id = id
        this.name = fullName
        this.pass = password
        this.birth = birthDate
        this.phone = phone
        this.email = email
    }
}

class Admin{
    constructor(id, fullName, password){
        this.id = id
        this.name = fullName
        this.pass = password
    }
}

class Book {
  constructor(id, title, author, publishYear, price, stock){
    this.id = id
    this.title = title
    this.author = author
    this.year = publishYear
    this.price = price
    this.stock = stock
  }
}

class Library {
    constructor(my_books) {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        this.my_books = my_books
    }

    add_book(book) {
        this.my_books.push(book)
        return this.my_books
    }

    remove_book(id) {
        for (const bk of this.my_books) {
            if (bk.id == id) {
                this.my_books.splice(this.my_books.indexOf(bk), 1)
            }
        }
        return this.my_books
    }

    find_book(title) {
        let titles = this.my_books.map(book => book.title)
        if (titles.includes(title)) {
            let num = titles.indexOf(title) + 1
            console.log('the number of your book is', num)
        }
        else { 
            console.log("we don't have your book")
        }
    }

    list_by_author() {
        let my_sorted_books = this.my_books.sort((a,b) => {
            if (a.author > b.author) {
                return 1
            }
            if (a.author < b.author) {
                return -1
            }
        })
        console.log(my_sorted_books)
    }

    async book_count() {
        return await new Promise(resulve => {
           setTimeout( () => {
           console.log(this.my_books.length)
           resulve()
        }, 1000) 
        })
          
    }

}

class ManageUser{
    constructor() {
        if (ManageUser.instance){
            return ManageUser.instance
        }
        ManageUser.instance = this
    }

    signUp_userGiveID(detail, file){
        for (const i of Object.values(file))
            if (i["id"] == detail["id"] || i["email"] == detail["email"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        fileManager.write("users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    signUp(detail, file){
        detail["id"] = Object.keys(file).length + 1
        detail["fullName"] = ""
        detail["birthDate"] = ""
        detail["email"] = ""

        for (const i of Object.values(file))
            if (i["phone"] == detail["phone"]){

                
                return [file, "your user already exist;\nplease sign in"]
            }
        file[Object.keys(file).length + 1] = detail
        fileManager.write("users.json", file)
        return [file, `user id: ${detail["id"]} successfully added;\nnow you can sign in`]
    }

    logIn(detail, file){
        for (const i of Object.values(file)){
            if (detail["phone"] == i["phone"]){
                if (detail["password"] == i["password"]){
                    const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
                    return [token, `you successfully logged in\nyour token: ${token}`]
                }else {
                    return [null, "wrong password"]
                }
            }
        }
        return [null, "couldn't find your user\ntry sign up"]
    }

}

class FileSys{
    constructor() {
        if (FileSys.instance){
            return FileSys.instance
        }
        FileSys.instance = this
    }

  async read(file){
    try{
        const data = await fs.readFile(file, "utf8")
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

//   stringToJson(str){
//     const a = str.split("\n")
//     const user = new User(Number(a[0]), a[1], a[2], a[3], a[4], a[5])
//     return user
//   }
}

const userManager = new ManageUser()
const fileManager = new FileSys()

if (!(await fileManager.exist("./users.json"))){
    await fileManager.write("./users.json", {})
}
let usersFile = await fileManager.read("./users.json")


app.get("/", (req, res) => {
    res.send("Welcome to library")
})

// app.post("/signup", (req,res) => {
//     const userDetail = req.body
//     // // // const userDetail = new User(req.body)
//     // fileManager.appnd("users.json", userDetail)
//     usersFile[Object.keys(usersFile).length + 1] = userDetail
//     fileManager.write("users.json", usersFile)
//     res.send(usersFile)
// })
app.post("/signup", (req,res) => {
    const signupli = userManager.signUp(req.body, usersFile)
    usersFile = signupli[0]
    const note = signupli[1]
    res.send(note)
})

app.post("/login", (req,res) => {
    const loginli = userManager.logIn(req.body, usersFile)
    const token = loginli[0]
    const note = loginli[1]
    res.send(note)
})

// const math_book = new Book("11", 'math', 'Amini', 1380, 50, true)
// const jeo_book = new Book("12", 'jeography', 'Falah', 1333, 60, true)
// const chem_book = new Book("13", 'chemistri', 'Rezaei', 1358, 70, true)
// const phys_book = new Book("14", 'physics', 'Nami', 1387, 80, true)
// const st_book = new Book("15", 'statistics', 'Zamani', 1395, 90, true)

// let books_ls = [math_book, jeo_book, chem_book, phys_book]
// const library_manager = new Library(books_ls)

// // checking outputs -------------------
// library_manager.book_count()
// library_manager.list_by_author()
// library_manager.find_book('math')
// console.log(library_manager.remove_book(12))
// console.log(library_manager.add_book(st_book))


app.listen(4000)