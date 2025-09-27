Tag repository:

Responsible for data access

-----  tagObj :  {id: 123, name: "tag1", status:"pending"} 

# createTag (input: tagData, output: tagObj)

# getTagById (input: tagId, output: tagObj)

# getTags (input: queryParams, output: [tagObj])

# updateTag (input: (tagId, tagData), output: tagObj)

# deleteTag (input: tagId, output: {id: 123})

# changeTagStatus(input: (tagId, status), output: tagObj)

---

TagDTO:

# fromJson (input: tagJson, output: tagObj)


# fromJsonList (input: DBResponse object, output: [tagObj])

    -) responsible for converting data response to tagObj

# toAtlasFormat (input: tagObj, [tagKeys, tagBody])

    -) responsible for converting tagObj to DB format (in this case -> Atlas)
