const { BookModel } = require("../../models/bookModel")

exports.BookDTO = class BookDTO {
    static toAtlasFormat(bookObj) {
        let bookKeys = [], bookBody = {}
        for (let [prop, val] of Object.entries(bookObj)) {
            if (val) {
                bookBody[prop] = val
                if (prop == 'tags') {
                    for (const tagName of val)  // ** Comment: add all tags to book keys (in atlas) 
                        bookKeys.push(`${prop}_${tagName}`)
                    continue
                }
                bookKeys.push(`${prop}_${val}`)
            }
        }
        return [bookKeys, bookBody]
    }

    static fromJson(bookJson) {
        return new BookModel(bookJson)
    }

    static fromJsonList(booksJsonList) {
        return booksJsonList.reduce((pre, bookJson) => {
            pre.push(BookDTO.fromJson(bookJson))
            return pre
        }, [])
    }
}