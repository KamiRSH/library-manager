import { FileSys } from "../repo/file_system.js"
const fileSys = new FileSys()

export class Library {
    constructor(booksLi) {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        this.booksLi = booksLi
    }

    static beAdmin(tokens, token){
        if (token == tokens[0]){
            return true
        }else{
            return false
        }
    }

    static findIndexById(id){
        const usingConstructor = new Library()
        for (const i of usingConstructor.booksLi){
            if (i.id == id){
                return usingConstructor.booksLi.indexOf(i)
            }
        }
    }

    viewTitles(){
        const titleLi = []
        for (const i of this.booksLi){
            titleLi.push(i.title)
        }
        return titleLi
    }

    viewDetail(id){
        if (Library.findIndexById(id) < this.booksLi.length){
            return this.booksLi[Library.findIndexById(id)]
        }else{
            return `couldn't find your book with id ${id}`
        }
        
    }

    addBook(detail, tokens, token) {
        if (Library.beAdmin(tokens, token)){
            if (this.booksLi.length == 0){
                detail.id = 0
            }else{
                detail.id = this.booksLi[this.booksLi.length -1].id + 1
            }
            detail.stock = true
            this.booksLi.push(detail)
            fileSys.write("./repo/books.json", this.booksLi)
            return `your book with id ${detail.id} successfully added`
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    editBook(id, detail, tokens, token){
        if (Library.beAdmin(tokens, token)){
            if (Library.findIndexById(id) < this.booksLi.length){
                for (const i of Object.keys(detail)){
                    this.booksLi[Library.findIndexById(id)][i] = detail[i]
                }
                fileSys.write("repo/books.json", this.booksLi)
                return "the books info successfully updated:"
            }else{
                return `couldn't find the book with id ${id}`
            }
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    removeBook(id, tokens, token) {
        if (Library.beAdmin(tokens, token)){
            if (Library.findIndexById(id) < this.booksLi.length){
                this.booksLi.splice(Library.findIndexById(id), 1)
                fileSys.write("./repo/books.json", this.booksLi)
                return `the book with id ${id} successfully deleted`
            }else{
                return `the book with id ${id} doesn't exist`
            }
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    filter(url){
        // const items = {
        //     "title": 0,
        //     "author": 0,
        //     "publishYear": 0,
        //     "price": 0,
        //     "id": 0,
        //     "stock": 0
        // }
        const li = []
        const li_id = []
        for (const i of this.booksLi){
            li.push(o)
        }
        
        for (const i of this.booksLi){
            for (const j of Object.keys(i)){
                if (url[j] && url[j] == i[j]){
                    li[this.booksLi.indexOf(i)] += 1
                }
            }
        }
        for (const i of li){
            if (i == Object.keys(url) - 1)
                li_id.push(this.booksLi[li.indexOf(i)].id)
        }
        return li_id

    }

    findBook(title) {
        let titles = this.booksLi.map(book => book.title)
        if (titles.includes(title)) {
            let num = titles.indexOf(title) + 1
            return `the number of your book is num`
        }
        else { 
            return "we don't have your book"
        }
    }

    listByAuthor() {
        let my_sorted_books = this.booksLi.sort((a,b) => {
            if (a.author > b.author) {
                return 1
            }
            if (a.author < b.author) {
                return -1
            }
        })
        return my_sorted_books
    }

    bookCount() {
        return this.booksLi.length
    }

}