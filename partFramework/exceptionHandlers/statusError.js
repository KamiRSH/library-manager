exports.error = {
    OrderStatusErrors: {
        NotFound: (tagId) => {
            return {
                message: `Tag with id: ${tagId} doesn't exist`,
                statusCode: 404,
                reason: "The tag you are trying to access does not exist.",
            };
        },
        Unauthorized: {
            message: "Only admin can change order's status",
            statusCode: 403,
            reason: "You do not have the necessary permissions to change the order's status. Only administrators can perform this action.",
        },
        BadRequestBookQuantity: (currentBookQuantityInOrder, bookId) => {
            return {
                message: `You have ${currentBookQuantityInOrder} books with id: ${bookId}. Cannot have a negative number of books.`,
                statusCode: 400,
                reason: "The quantity of books in the order cannot be negative. Please check the order details.",
            };
        },
        NoOrderWithSpecifiedStatus: (userId, status) => {
            return {
                message: `User with id: ${userId} doesn't have any order with status: ${status}`,
                statusCode: 400,
                reason: `The user with the specified ID has no orders with the status '${status}'. Please verify the order status and try again.`,
            };
        },
    },
    CommentStatusErrors: {
        CommentNotFound: {
            message: "Comment not found",
            statusCode: 404,
            reason: "The comment you are trying to access does not exist or may have been deleted.",
        },
        DontAccessToComment: {
            message: "Don't have access to the comment",
            statusCode: 403,
            reason: "You do not have permission to access this comment.",
        },
        CannotEditComment: {
            message: "Can't edit the comment",
            statusCode: 403,
            reason: "You do not have permission to edit this comment.",
        },
        CantDeleteComment: {
            message: "Can't delete the comment",
            statusCode: 403,
            reason: "You do not have permission to delete this comment.",
        },
        AlreadyApprove: {
            message: "Comment already approved",
            statusCode: 409,
            reason: "The comment has already been approved and cannot be approved again.",
        },
        AlreadyRejected: {
            message: "Comment already rejected",
            statusCode: 409,
            reason: "The comment has already been rejected and cannot be rejected again.",
        },
        AlreadyReported: {
            message: "Comment already reported",
            statusCode: 409,
            reason: "The comment has already been reported and cannot be reported again.",
        },
    },
    UserStatusErrors: {
        UserAlreadyExists: {
            message: "User already exists",
            statusCode: 409,
            reason: "A user with the provided information already exists in the system.",
        },
        PasswordMismatch: {
            message: "Password does not match the repeated password",
            statusCode: 400,
            reason: "The passwords entered do not match. Please try again.",
        },
        UserNotFound: {
            message: "User not found",
            statusCode: 404,
            reason: "The user you are trying to access does not exist in the system.",
        },
        IncorrectPassword: {
            message: "Password is incorrect",
            statusCode: 401,
            reason: "The password you entered does not match our records. Please try again.",
        },
        EmailAlreadyExists: {
            message: "This email already exists",
            statusCode: 409,
            reason: "A user with this email address is already registered in the system.",
        },
        RoleAlreadyAssigned: {
            message: "User already has this role",
            statusCode: 409,
            reason: "The user is already assigned to the specified role.",
        },
        RoleAlreadyRequested: {
            message: "Role already requested",
            statusCode: 409,
            reason: "A request for this role has already been submitted.",
        },
    },
    TagStatusErrors: {
        DuplicateTag: (tagName) => {
            return {
                message: `Tag with name: ${tagName} already exists`,
                statusCode: 409,
                reason: "A tag with this name already exists in the system.",
            };
        },
        NotFound: (tagId) => {
            return {
                message: `Tag with id: ${tagId} doesn't exist`,
                statusCode: 404,
                reason: "The tag you are trying to access does not exist.",
            };
        },
        Unauthorized: {
            message: "Only admin can change tag's status",
            statusCode: 403,
            reason: "You do not have the necessary permissions to change the tag's status. Only administrators can perform this action.",
        },
        BadRequest: {
            message:
                "Invalid status. Valid status: accepted, rejected, pending",
            statusCode: 400,
            reason: "The provided status is invalid. Please use one of the valid statuses: accepted, rejected, or pending.",
        },
    },
    BookStatusErrors: {
        DuplicateBook: (bookTitle, authorName) => {
            return {
                message: `Book with title: ${bookTitle} and author: ${authorName} already exists`,
                statusCode: 409,
                reason: `A book with the title '${bookTitle}' by author '${authorName}' already exists in the system. Duplicates are not allowed.`,
            };
        },
        NotFound: (bookId) => {
            return {
                message: `Book with id: ${bookId} doesn't exist`,
                statusCode: 404,
                reason: `The book with the specified ID '${bookId}' does not exist in the system. Please verify the book ID and try again.`,
            };
        },
        Unauthorized: {
            message: "Only admin can change book's status",
            statusCode: 403,
            reason: "You do not have the necessary permissions to change the book's status. Only administrators can perform this action.",
        },
        BadRequest: {
            message:
                "Invalid status. Valid statuses: accepted, rejected, pending",
            statusCode: 400,
            reason: "The provided status is invalid. Please use one of the valid statuses: accepted, rejected, or pending.",
        },
        BookIdNotGiven: {
            message: "BookId is not given",
            statusCode: 400,
            reason: "The BookId parameter is required and must be provided. Please include a valid BookId in your request.",
        },
    },
    AuthenticationErrors: {
        PleaseLogoutFirst: {
            message: "Please logout first",
            statusCode: 400,
            reason: "You need to log out before performing this action. Please logout and try again.",
        },
        AccessDenied: {
            message: "Don't access",
            statusCode: 400,
            reason: "You do not have permission to access this resource. Please check your access rights and try again.",
        },
    },
};
