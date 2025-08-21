export class Library {
    constructor(file) {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        this.file = file
    }

    viewTitles(){
        const bookLi = []
        for (const i of this.file){
            bookLi.push(i.title)
        }
        return bookLi
    }

    viewDetail(id){
        return this.file[id]
    }

    addBook(detail) {
        detail.id = this.file.length
        this.file.push(detail)
        fileManager.write("./books.json", this.file)
        return `your book with id ${detail.id} successfully added`
    }

    editBook(id, detail){
        if (Number(id) < this.file.length){
            for (const i of Object.keys(detail)){
                this.file[id][i] = detail[i]
            }
            fileManager.write("./books.json", this.file)
            return "the books info successfully updated:"
        }else{
            return `couldn't find the book with id ${id}`
        }
    }

    removeBook(id) {
        if (Number(id) <= this.file.length){
            this.file[id].splice(this.file.indexOf(bk), 1)
            fileManager.write("./books.json", this.file)
            return `the book with id ${id} successfully deleted`
        }else{
            return `the book with id ${id} doesn't exist`
        }
        
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