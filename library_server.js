import express from "express"
import { FileSys } from "./sources/file_sys.js"
import { Library } from "./sources/library.js"
import { ManageUser } from "./sources/manage_user.js"

const app = express()
app.use(express.json())

class User{     //id, fullName, password, birthDate, phone, email
    constructor(detail){
        this.id = detail.id
        this.name = detail.fullName
        this.pass = detail.password
        this.birth = detail.birthDate
        this.phone = detail.phone
        this.email = detail.email
        this.token = null
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

// define managers
const fileManager = new FileSys()
// [create and] read the usersFile
if (!(await fileManager.exist("./users.json"))){
    await fileManager.write("./users.json", [])
}
const usersFile = await fileManager.read("./users.json")

const userManager = new ManageUser(usersFile)

let tokens = []
for (const i of usersFile){
    tokens.push(null)
}
console.log(tokens)

// APIs
app.get("/", (req, res) => {
    res.send("Welcome to library")
})

app.post("/signup", (req, res) => {
    const detail = userManager.signUp(req.body)
    tokens.push(null)
    const signingUpUser = new User(detail)
    res.send(`user id: ${detail.id} successfully added;\nnow you can sign in`)
})

app.post("/login", (req, res) => {
    const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
    const index = userManager.logIn(req.body)
    if (token != -1){
        tokens[index] = token
        // console.log(tokens)
        res.send(`you successfully logged in\nyour token: ${token}`)
    }else{
        res.send("phone number or password is incorrect")
    }
    
})

app.get("/users/:id/profile", (req, res) => {
    res.send(userManager.view(req.params.id, usersFile))
})

app.patch("/users/:id/profile", (req, res) => {
    const li = userManager.edit(req.params.id, usersFile, req.body)
    if (li){
        usersFile = li[0]
        const note = li[1]
        const info = li[2]
        res.send(note, info)
    }else{
        res.send(`couldn't find user with id ${req.params.id}`)
    }
    
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