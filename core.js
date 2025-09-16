import { Library } from "./services/library.js"
import { ManageUser } from "./services/manage_user.js"
import { Tools } from "./services/tools.js"

const userManager = new ManageUser(dto.jFile_to_objUsers("./repo/users.json"))
const library = new Library(dto.jFile_to_objBooks("./repo/books.json"))
const tools = new Tools()

export class Core{
    constructor(){
        if (Core.instance){
            return Core.instance
        }
        Core.instance = this
        this.tokens = []
        for (const i of userManager.usersLi){
            this.tokens.push(null)
        } 
    }

    lobby(){
        return "Welcome to library"
    }

    signup(reqBody){
        const detail = userManager.signUp(reqBody)
        if (detail){
            this.tokens.push(null)
            return `user id: ${detail.id} successfully added;\nnow you can login`
        }else{
            return "your user already exist\ntry login"
        }
    }

    login(reqBody){
        const token = tools.generate16digits()
        const index = userManager.logIn(reqBody)
        if (index != -1){
            this.tokens[index] = token
            return `you successfully logged in\nyour token: ${token}`
        }else{
            return "phone number or password is incorrect"
        }
    }

    viewUser(reqParamsId, reqGetToken){
        return userManager.view(reqParamsId, this.tokens, reqGetToken)
    }

    editUser(reqParamsId, reqBody, reqGetToken){
        return userManager.edit(reqParamsId, reqBody, this.tokens, reqGetToken)
    }

    viewBooksList(){
        return library.viewTitles()
    }

    viewBook(reqParamsBookId){
        return library.viewDetail(reqParamsBookId)
    }

    addBook(reqBody, reqGetToken){
        return library.addBook(reqBody, this.tokens, reqGetToken)
    }

    editBook(reqParamsBookId, reqBody, reqGetToken){
        return library.editBook(reqParamsBookId, reqBody, this.tokens, reqGetToken)
    }

    removeBook(reqParamsBookId){
        return library.removeBook(reqParamsBookId)
    }
}

// // users APIs
// app.get("/", (req, res) => {
//     res.send("Welcome to library")
// })

// app.post("/signup", (req, res) => {
//     const detail = userManager.signUp(req.body)
//     if (detail){
//         this.tokens.push(null)
//         res.send(`user id: ${detail.id} successfully added;\nnow you can login`)
//     }else{
//         res.send("your user already exist\ntry login")
//     }
    
// })

// app.post("/login", (req, res) => {
//     const token = tools.generate16digits()
//     const index = userManager.logIn(req.body)
//     if (index != -1){
//         this.tokens[index] = token
//         res.send(`you successfully logged in\nyour token: ${token}`)
//     }else{
//         res.send("phone number or password is incorrect")
//     }
    
// })

// app.get("/users/:id/profile", (req, res) => {
//     res.send(userManager.view(req.params.id, this.tokens, req.get("token")))
// })

// app.patch("/users/:id/profile", (req, res) => {
//     res.send(userManager.edit(req.params.id, req.body, this.tokens, req.get("token")))
// })

// // books APIs
// app.get("/books", (req, res) => {
//     res.send(library.viewTitles())
// })

// app.get("/books/:book_id", (req, res) => {
//     res.send(library.viewDetail(req.params.book_id))
// })

// // admins APIs
// app.post("/admin-panel/books", (req, res) => {
//     res.send(library.addBook(req.body, this.tokens, req.get("token")))
// })

// app.patch("/admin-panel/books/:book_id", (req, res) => {
//     res.send(library.editBook(req.params.book_id, req.body, this.tokens, req.get("token")))
// })

// app.delete("/admin-panel/books/:book_id", (req, res) => {
//     res.send(library.removeBook(req.params.book_id))
// })

// app.get("/bookss/search", (req, res) => {
//     const filter = req.query
//     console.log(filter.title)
//     res.send()
// })
