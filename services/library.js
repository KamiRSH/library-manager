import { FileSys } from "../repo/file_system.js"
const fileSys = new FileSys()

export class Library {
    constructor(file) {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        this.file = file
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
        for (const i of usingConstructor.file){
            if (i.id == id){
                return usingConstructor.file.indexOf(i)
            }
        }
    }

    viewTitles(){
        const bookLi = []
        for (const i of this.file){
            bookLi.push(i.title)
        }
        return bookLi
    }

    viewDetail(id){
        if (Library.findIndexById(id) < this.file.length){
            return this.file[Library.findIndexById(id)]
        }else{
            return `couldn't find your book with id ${id}`
        }
        
    }

    addBook(detail, tokens, token) {
        if (Library.beAdmin(tokens, token)){
            if (this.file.length == 0){
                detail.id = 0
            }else{
                detail.id = this.file[this.file.length -1].id + 1
            }
            detail.stock = true
            this.file.push(detail)
            fileSys.write("./books.json", this.file)
            return `your book with id ${detail.id} successfully added`
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    editBook(id, detail){
        if (Library.beAdmin){
            if (Library.findIndexById(id) < this.file.length){
                for (const i of Object.keys(detail)){
                    this.file[Library.findIndexById(id)][i] = detail[i]
                }
                fileSys.write("./books.json", this.file)
                return "the books info successfully updated:"
            }else{
                return `couldn't find the book with id ${id}`
            }
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    removeBook(id) {
        if (Library.beAdmin){
            if (Library.findIndexById(id) < this.file.length){
                this.file.splice(Library.findIndexById(id), 1)
                fileSys.write("./books.json", this.file)
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
        for (const i of this.file){
            li.push(o)
        }
        
        for (const i of this.file){
            for (const j of Object.keys(i)){
                if (url[j] && url[j] == i[j]){
                    li[this.file.indexOf(i)] += 1
                }
            }
        }
        for (const i of li){
            if (i == Object.keys(url) - 1)
                li_id.push(this.file[li.indexOf(i)].id)
        }
        return li_id

    }

    findBook(title) {
        let titles = this.file.map(book => book.title)
        if (titles.includes(title)) {
            let num = titles.indexOf(title) + 1
            return `the number of your book is num`
        }
        else { 
            return "we don't have your book"
        }
    }

    listByAuthor() {
        let my_sorted_books = this.file.sort((a,b) => {
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
        return this.file.length
    }

}