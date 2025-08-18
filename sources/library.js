export class Library {
    constructor(my_books) {
        if (Library.instance){
            return Library.instance
        }
        Library.instance = this
        this.my_books = my_books
    }

    add_book(book) {
        this.my_books.push(book)
        return this.my_books
    }

    remove_book(id) {
        for (const bk of this.my_books) {
            if (bk.id == id) {
                this.my_books.splice(this.my_books.indexOf(bk), 1)
            }
        }
        return this.my_books
    }

    find_book(title) {
        let titles = this.my_books.map(book => book.title)
        if (titles.includes(title)) {
            let num = titles.indexOf(title) + 1
            console.log('the number of your book is', num)
        }
        else { 
            console.log("we don't have your book")
        }
    }

    list_by_author() {
        let my_sorted_books = this.my_books.sort((a,b) => {
            if (a.author > b.author) {
                return 1
            }
            if (a.author < b.author) {
                return -1
            }
        })
        console.log(my_sorted_books)
    }

    async book_count() {
        return await new Promise(resulve => {
           setTimeout( () => {
           console.log(this.my_books.length)
           resulve()
        }, 1000) 
        })
          
    }

}