const { BookRepository } = require("../../repositories/bookRepository/index")
const {BookStatusErrors} = require("../../exceptionHandlers/statusError").error

class BookService {
    constructor() {
        this.bookRepository = new BookRepository()

    }
    async getBookById(bookID) {
        return await this.bookRepository.getBookById(bookID)
    }

    async createBook(bookData) {
        if ((await this.getBooks({"title": bookData.title, "author": bookData.author})).length){
            throw BookStatusErrors.DuplicateBook(bookData.title, bookData.author)
        }

        return await this.bookRepository.createBook(bookData)
    }

    async getBooks(queryString){
        return this.bookRepository.getBooks(queryString)
    }
    async deleteBook(bookId){
        return this.bookRepository.deleteBook(bookId)
    }
    async updateBook(bookId, bookData){
        //#TODO
        // only the book Owner and admin can update the book
        return this.bookRepository.updateBook(bookId, bookData)
    }

    async addOrRemoveTags(bookId, tagsUpdateData){
        return await this.bookRepository.addOrRemoveTags(bookId, tagsUpdateData)
    }
}

module.exports = BookService 