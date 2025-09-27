export const configuration = {
    name: "book",
    path: "./main.js",
    // transpile: false,
    exception: {},
    handlers: {
        viewBookById: {
            needProtocolRef: false,
            params: [
                '_inputData.params.bookId',
            ]
        },
        addBook: {
            needProtocolRef: false,
            params: [
                '_protocolRef.request.postData',
                '_protocolRef.request.headers.token'
            ]
        },
        viewBooksList: {
            needProtocolRef: false,
            params: [
                '_protocolRef.request.queryString'
            ]
        },
        removeBook: {
            needProtocolRef: false,
            params: ["_inputData.params.bookId",'_protocolRef.request.headers.token'] // path params
        },
        editBook: {
            needProtocolRef: false,
            params: ["_inputData.params.bookId", "_protocolRef.request.postData",'_protocolRef.request.headers.token'] // path params
        },
    }
}