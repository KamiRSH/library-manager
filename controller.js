import express from "express"
import { DTO } from "./model.js"    // aval code haye dakhele model bayad khande she bad code haye core (baraye tartib exist va read
import { Core } from "./core.js"
const dto = new DTO()
const core = new Core()

const app = express()
app.use(express.json())

//APIs
app.get("/", (req, res) => {
    res.send(core.lobby())
})

app.post("/signup", (req, res) => {
    const objDetail = dto.jDetailToObjUser(req.body)
    res.send(core.signup(objDetail))
})

app.post("/login", (req, res) => {
    const objDetail = dto.jDetailToObjUser(req.body)
    res.send(core.login(objDetail))
})

app.get("/users/:id/profile", (req, res) => {
    res.send(core.viewUser(Number(req.params.id), req.get("token")))
})

app.patch("/users/:id/profile", (req, res) => {
    const objDetail = dto.jDetailToObjUser(req.body)
    res.send(core.editUser(Number(req.params.id), objDetail, req.get("token")))
})

app.get("/books", (req, res) => {
    res.send(core.viewBooksList())
})

app.get("/books/:book_id", (req, res) => {
    res.send(core.viewBookById(Number(req.params.book_id)))
})

app.post("/admin-panel/books", (req, res) => {
    const objDetail = dto.jDetailToObjBooks(req.body)
    res.send(core.addBook(objDetail, req.get("token")))
})

app.patch("/admin-panel/books/:book_id", (req, res) => {
    const objDetail = dto.jDetailToObjBooks(req.body)
    res.send(core.editBook(Number(req.params.book_id), objDetail, req.get("token")))
})

app.delete("/admin-panel/books/:book_id", (req, res) => {
    res.send(core.removeBook(Number(req.params.book_id), req.get("token")))
})

app.get("/bookss/search", (req, res) => {
    res.send()
})


app.listen(4000)