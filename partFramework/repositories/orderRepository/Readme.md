# addOrRemoveBook

    -) responsible for add new book and update book quantity

    input format:

        -) orderJson:{
                id: "123",
                userId: "432432",
                status: pending/paid,
                books: {
                    $(book1Id): $(book1Quantity),
                    $(book2Id): $(book2Quantity)
                }
            }

        -) books: [
            {bookId: "1232", quantity: 3},
            {bookId: "154", quantity: 5}
        ]
