# Note
    -) We check book quantity existence when payment handler is called. If it exists then the book quantity will be updated otherwise it will throw an error


# payment(input: userId, output: )
    -) changes order's status to paid
    -) should call updateBook after payment