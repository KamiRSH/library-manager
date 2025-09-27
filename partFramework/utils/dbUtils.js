/*
flattens 'body' in  DBBodyResponse
input: {id: 123, body: {"key1": "val1", "key2": "val2"}}
output: {id: 123, "key1": "val1", "key2": "val2"}
*/

exports.DBResponseToJson = function DBResponseToJson(DBBodyResponse) {
    return DBBodyResponse.map(DBJson => {
        return { "id": DBJson.id, ...DBJson.body }
    })
}

