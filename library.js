class book {
  constructor(id, title, author, year){
    this.id = id
    this.title = title
    this.author = author
    this.year = year
    this.isAvailable = true
  }
}

// const book1 = new book(11, 'sth', 'man', 19999)
// console.log(book1)

class library {
    constructor(my_books) {
        this.my_books = my_books
    }

    add_book(book) {
        this.my_books.push(book)
        return this.my_books
    }

    remove_book(id) {
        // ids = my_books.map(book => book.id)
        for (const bk of my_books) {
            if (bk.id == id) {
                this.my_books.splice(this.my_books.indexOf(bk), 1)
            }
        }
        // // this.my_books.splice(this.my_books.indexOf(book), 1)
        return this.my_books
    }

    find_book(title) {
        titles = my_books.map(book => book.title)
        if (title in titles) {
            console.log('the number of your book is', titles.indexOf(title))
        }
        else { 
            console.log("we don't have your book")
        }
    }

    list_by_author() {
        console.log(this.my_books.sort((a,b) => (a.author - b.author)))
    }

    book_count() {
        console.log(this.my_books.length)
    }

}


// // input(id)
// for (const bk of my_book) {
//     if (bk.id == id) {
//         bad_book = bk
//     }
// }