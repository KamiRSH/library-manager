const Comment = require("../../models/comment")
const ShamsiDate = require("../../utils/shamsiDate")
const CommentStatusError = require("../../exceptionHandlers/statusError").error.CommentStatusErrors
class CommentService{
    constructor(){
        if (CommentService.instance) {
            return CommentService.instance;
        } 
        CommentService.instance = this; 
    }
    async createComment(userId, bookId, commentData){
        const newComment = new Comment(commentData)
        newComment.bookId = bookId
        newComment.userId = userId
        newComment.status = "pending"
        newComment.createDate = ShamsiDate()
        newComment.createComment()
        return newComment
    }
    async getCommentsByUser(userId){
        return await Comment.findCommentsByKeys({"userId":userId,"status": "published"})
    } 
    async getCommentsByBook(bookId){
        return await Comment.findCommentsByKeys({"bookId":bookId, "status": "published"})
    }
    async getCommentsByStatus(status){
        return await Comment.findCommentsByKeys({"status": status})
    }
    async getCommentById(commentId){
        return await Comment.findCommentById(commentId)
    }
    async updateComment(userId, commentId,commentData){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        if (existComment[0].userId !== userId) throw CommentStatusError.DontAccessToComment
        if (Number(existComment[0].createDate) < Number(ShamsiDate(-1))){
            throw statusError.e4003
        }
        existComment[0].updatedDate = ShamsiDate()
        commentData.status = "pending"
        return existComment[0].updateComment(commentData)
    }
    async deleteComment(commentId, userId){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        if(userId != "" && existComment[0].userId != userId) throw CommentStatusError.CantDeleteComment
        return existComment[0].deleteComment()
    }
    async changeCommentStatus(commentId,status){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        return existComment[0].updateComment({"status":status})
    }
    async approveComment(commentId){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        if(existComment[0].status == "published") throw CommentStatusError.AlreadyApprove
        return existComment[0].updateComment({"status":"published"})
    }
    async rejectComment(commentId){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        if(existComment[0].status == "reject") throw CommentStatusError.AlreadyRejected
        return existComment[0].updateComment({"status":"reject"})
    }
    async reportComment(commentId, reason){
        const existComment = await Comment.findCommentById(commentId)
        if (!existComment.length) throw CommentStatusError.CommentNotFound
        if(existComment[0].status == "report") throw CommentStatusError.AlreadyReported
        return existComment[0].updateComment({"status":"report", "reason": reason})
    }
    async getAllComments(){
        return await Comment.findCommentsByKeys({"status": "published"})
    }

}
module.exports = CommentService