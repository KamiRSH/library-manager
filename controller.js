import express from "express"
import { Core } from "./core.js"
import { DTO } from "./model.js"

const dto = new DTO()
const core = new Core()

const app = express()
app.use(express.json())

//APIs
app.get("/", (req, res) => {
    res.send(core.lobby())
})

app.post("/signup", (req, res) => {
    res.send(core.signup(req.body))
})

app.post("/login", (req, res) => {
    res.send(core.login(req.body))
})

app.get("/users/:id/profile", (req, res) => {
    res.send(core.viewUser(req.params.id, req.get("token")))
})

app.patch("/users/:id/profile", (req, res) => {
    res.send(core.editUser(req.params.id, req.body, req.get("token")))
})

app.get("/books", (req, res) => {
    res.send(core.viewBooksList())
})

app.get("/books/:book_id", (req, res) => {
    res.send(core.viewBook(req.params.book_id))
})

app.post("/admin-panel/books", (req, res) => {
    res.send(core.addBook(req.body, req.get("token")))
})

app.patch("/admin-panel/books/:book_id", (req, res) => {
    res.send(core.editBook(req.params.book_id, req.body, req.get("token")))
})

app.delete("/admin-panel/books/:book_id", (req, res) => {
    res.send(core.removeBook(req.params.book_id))
})

app.get("/bookss/search", (req, res) => {
    res.send()
})


app.listen(4000)