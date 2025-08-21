import express from "express"
import { randomInt } from "node:crypto"
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
function generate16digits(){
  const part1 = randomInt(10 ** 7, 10 ** 8 - 1)
  const part2 = randomInt(10 ** 7, 10 ** 8 - 1)
  return Number(part1.toString() + part2.toString())
}
async function getStarted(fileName){
    if (!(await fileManager.exist(fileName))){
        await fileManager.write(fileName, [])
    }return
}

// define managers    // [create and] read the files    // create tokens list

const fileManager = new FileSys()

await getStarted("./users.json")
await getStarted("./books.json")

const usersFile = await fileManager.read("./users.json")
const booksFile = await fileManager.read("./books.json")

const userManager = new ManageUser(usersFile)
const library = new Library(booksFile)

let tokens = []
for (const i of usersFile){
    tokens.push(null)
}

// users APIs
app.get("/", (req, res) => {
    res.send("Welcome to library")
})

app.post("/signup", (req, res) => {
    const detail = userManager.signUp(req.body)
    if (detail){
        tokens.push(null)
        const signingUpUser = new User(detail)
        res.send(`user id: ${detail.id} successfully added;\nnow you can login`)
    }else{
        res.send("your user already exist\ntry login")
    }
    
})

app.post("/login", (req, res) => {
    const token = generate16digits()
    // const token = Math.round(Math.random() * (10 ** 16 - 10 **15)) + 10 ** 15
    const index = userManager.logIn(req.body)
    if (index != -1){
        tokens[index] = token
        res.send(`you successfully logged in\nyour token: ${token}`)
    }else{
        res.send("phone number or password is incorrect")
    }
    
})

app.get("/users/:id/profile", (req, res) => {
    res.send(userManager.view(req.params.id, tokens, req.get("token")))
})

app.patch("/users/:id/profile", (req, res) => {
    res.send(userManager.edit(req.params.id, req.body, tokens, req.get("token")))
})

// books APIs
app.get("/books", (req, res) => {
    res.send(library.viewTitles())
})

app.get("/books/:book_id", (req, res) => {
    req.send(library.viewDetail(req.params.book_id))
})

// admins APIs
app.post("/admin-panel/books", (req, res) => {
    req.send(library.addBook(req.body))
})

app.patch("/admin-panel/books/:book_id", (req, res) => {
    res.send(library.editBook(req.params.book_id, req.body))
})

app.delete("/admin-panel/books/:book_id", (req, res) => {})

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