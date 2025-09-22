import { FileSys } from "../repo/file_system.js"
import { DTO } from "../model.js"
import { Tools } from "./tools.js"
import { ManageUser } from "./manage_user.js"
const dto = new DTO()
// const fileSys = new FileSys()
const tools = new Tools()
const userManager = new ManageUser

export class Library{
    constructor() {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        // this.booksLi = booksLi
        this.booksLi = []
    }

    async init(){
        this.booksLi = await dto.jFile_to_objBooks()
        dto.objBooks_to_jFile(this.booksLi)     // no need for this line
    }

    viewTitles(){
        const titleLi = []
        for (const i of this.booksLi){
            titleLi.push(i.title)
        }
        return titleLi
    }

    viewDetail(id){
        const index = tools.indexOfId(this.booksLi, id)
        if (index != -1){
            return this.booksLi[index]
        }else{
            return `couldn't find your book with id ${id}`
        }
        
    }

    addBook(detail, token){
        if (tools.beAdmin(userManager.usersLi, token)){
            if (this.booksLi.length == 0){
                detail.id = 0
            }else{
                const lastId = this.booksLi[this.booksLi.length -1].id
                detail.id = lastId + 1
            }
            detail.stock = true
            this.booksLi.push(detail)
            dto.objBooks_to_jFile(this.booksLi)
            // fileSys.write("./repo/books.json", this.booksLi)
            return `your book with id ${detail.id} successfully added`
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    editBook(id, detail, token){
        const index = tools.indexOfId(this.booksLi, id)
        if(tools.beAdmin(userManager.usersLi, token)){
            if(index != -1){
                for(const i of Object.keys(detail)){
                    if(detail[i]){
                        this.booksLi[index][i] = detail[i]
                    }                    
                }
                dto.objBooks_to_jFile(this.booksLi)
                // fileSys.write("repo/books.json", this.booksLi)
                return "the books info successfully updated:"
            }else{
                return `couldn't find the book with id ${id}`
            }
        }else{
            return "make sure you are admin and you entered your token correctly"
        }
        
    }

    removeBook(id, token){
        const index = tools.indexOfId(this.booksLi, id)
        if(tools.beAdmin(userManager.usersLi, token)){
            if(index != -1){
                this.booksLi.splice(index, 1)
                dto.objBooks_to_jFile(this.booksLi)
                // fileSys.write("./repo/books.json", this.booksLi)
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
