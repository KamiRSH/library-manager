const express = require("express")
const app = express()


class Book {
  constructor(id, title, author, year){
    this.id = id
    this.title = title
    this.author = author
    this.year = year
    this.isAvailable = true
  }
}

class Library {
    constructor(my_books) {
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



const math_book = new Book(11, 'math', 'Amini', 1380)
const jeo_book = new Book(12, 'jeography', 'Falah', 1333)
const chem_book = new Book(13, 'chemistri', 'Rezaei', 1358)
const phys_book = new Book(14, 'physics', 'Nami', 1387)
const st_book = new Book(15, 'statistics', 'Zamani', 1395)

books_ls = [math_book, jeo_book, chem_book, phys_book]
const library_manager = new Library(books_ls)

// // checking outputs -------------------
// library_manager.book_count()
// library_manager.list_by_author()
// library_manager.find_book('math')
// console.log(library_manager.remove_book(12))
// console.log(library_manager.add_book(st_book))

app.listen(3000)