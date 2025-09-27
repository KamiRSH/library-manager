exports.BookModel = class BookModel{

    //#TODO validation?
    static #fields = ['id', 'title', 'author', 'publicationYear', 'price', 'bookSummary', 'quantity', 'tags', 'status']

    /*
        tags: array of tag ids
        comments: array of comment ids
    */
    
    constructor(bookData){
        for (const prop of BookModel.#fields){
            this[prop] = bookData[prop]
        }
        if (!bookData.status)
            this.status = 'pending'

    }
}