const loader = require("@partFramework/loader").getInstance()
const { tablesName } = require("../../project-config/dev/atlasTablesNameConfig")
const { BookModel } = require("../../models/bookModel")
const { BookDTO } = require("./bookDTO")
const { BookStatusErrors } = require("../../exceptionHandlers/statusError").error
const { DBResponseToJson } = require('../../utils/dbUtils')

exports.BookRepository = class BookRepository {
    #db


    constructor() {

        this.#db = loader.get('atlasInterface')

    }
    async getBookById(bookID) {

        const DBResponse = await this.#db.table(tablesName.Book).select('body', 'id').on("id").where(bookID).get()
        const booksJsonList = DBResponseToJson(DBResponse.body.data.result)
        if (!booksJsonList.length) {
            throw BookStatusErrors.NotFound(bookID)
        }
        return BookDTO.fromJsonList(booksJsonList)[0]
    }

    async createBook(bookData) {
        const bookObj = BookDTO.fromJson(bookData)
        const [bookKeys, bookBody] = BookDTO.toAtlasFormat(bookObj)



        const DBResponse = (await this.#db.table(tablesName.Book).insert({
            keys: bookKeys,
            body: bookBody

        })).body.data.result

        const bookJsonList = DBResponseToJson([{ id: DBResponse.success[0], body: bookData }])
        return BookDTO.fromJsonList(bookJsonList)[0]
    }

    async getBooks(queryString) {
        let keysSearch = []
        let tagSearch = []
        let bookDBResponse;
        if (queryString) {
            for (const [key, val] of Object.entries(queryString)) {
                if (key == 'tags') {
                    for (const tagName of val) {
                        tagSearch.push(`tags_${tagName}`)
                    }
                    continue
                }
                keysSearch.push(`${key}_${val}`)
            }
            if (tagSearch.length) {
                if (keysSearch.length) {

                    bookDBResponse = (await this.#db.table(tablesName.Book).select("id", 'body')
                        .where(keysSearch)
                        .where(function (qBuilder) {
                            qBuilder.orWhere(tagSearch)
                        }).get()).body.data.result
                }
                else {
                    bookDBResponse = (await this.#db.table(tablesName.Book).select("id", "body").orWhere(tagSearch).get()).body.data.result
                }
            }
            else
                bookDBResponse = (await this.#db.table(tablesName.Book).select("id", 'body').where(keysSearch).get()).body.data.result


        }
        else {
            bookDBResponse = (await this.#db.table(tablesName.Book).select("id", 'body').startsWith("title_").get()).body.data.result
        }

        const bookJsonList = DBResponseToJson(bookDBResponse)
        // #NOTE: presentation logic shouldn't be in repository layer
        const res = BookDTO.fromJsonList(bookJsonList)
        return res
    }

    async deleteBook(bookId) {
        return await this.#db.table(tablesName.Book).on('id').where(bookId).delete()
    }
    async updateBook(bookId, bookData) {
        const bookObj = await this.getBookById(bookId)
        const [bookKeys, bookBody] = BookDTO.toAtlasFormat(bookObj)

        const notAllowedUpdateFields = ['status', 'tags']
        for (let [prop, val] of Object.entries(bookData)){
            if (notAllowedUpdateFields.includes(val))
                continue
            bookBody[prop] = bookData[prop]
        }

        await this.#db.table(tablesName.Book).on("id").where(bookId).update({
            keys: bookKeys,
            body: bookBody
        })
        return bookBody
    }
    
    async addOrRemoveTags(bookId, tagsUpdateData) {
        // Checking if the tags ids exists is handled in controller + status=accepted (BAD practice)

        const bookObj = await this.getBookById(bookId)
        let [bookKeys, bookBody] = BookDTO.toAtlasFormat(bookObj)

        let addingTags = new Set(tagsUpdateData.add)
        let removingTags = new Set(tagsUpdateData.remove)
        let bookTags = new Set(bookBody.tags)

        // It's better to use Set for intersection or Union operations
        // union
        let tagsUnion = new Set([...bookTags, ...addingTags])
        bookBody.tags = ([...tagsUnion].filter(tagName => ! removingTags.has(tagName)))
        
        // remove previous bookTags keys
        bookKeys = bookKeys.filter(key => !key.startsWith("tags"))
        bookKeys = [...bookKeys, ...(bookBody.tags)]
        
        delete bookBody.id
        await this.#db.table(tablesName.Book).on("id").where(bookId).update({
            keys: bookKeys,
            body: bookBody
        })
        return bookBody
    }
}