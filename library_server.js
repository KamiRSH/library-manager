import express from "express"
import { FileSys } from "./sources/file_sys.js"
import { Library } from "./sources/library.js"
import { ManageUser } from "./sources/manage_user.js"

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

// define managers
const userManager = new ManageUser()
const fileManager = new FileSys()

// [create and] read the usersfile
if (!(await fileManager.exist("./users.json"))){
    await fileManager.write("./users.json", {})
}
let usersFile = await fileManager.read("./users.json")
const tokens = []     //engar inja har dafe khali mikone

// APIs
app.get("/", (req, res) => {
    res.send("Welcome to library")
})

app.post("/signup", (req,res) => {
    const li = userManager.signUp(req.body, usersFile)
    usersFile = li[0]
    const note = li[1]
    tokens.push(null)
    console.log(tokens)
    res.send(note)
})

app.post("/login", (req,res) => {
    const li = userManager.logIn(req.body, usersFile)
    // console.log(li)
    const id = li[0]
    tokens[id - 1] = li[1]
    const note = li[2]
    console.log(tokens)
    res.send(note)
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