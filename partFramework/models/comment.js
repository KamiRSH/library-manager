const CommentDB = require("../repositories/commentRepository/index")
const commentDB = new CommentDB()
 
class Comment {
    constructor(commentData) {
        for(const key in commentData){
            this[key] = commentData[key]
        }
    } 
    createComment(){
        commentDB.insertComment(this)
        return true
    }
    static async findCommentsByKeys(params){
        const commentsDB = await commentDB.findByKeys(params)
        let comments = []
        commentsDB.forEach(commentdb =>{
            let comment = new Comment(commentdb.body)
            comment.id = commentdb.id
            comments.push(comment)
        })
        return comments
    }
    static async findCommentById(commentId){
        const commentsDB = await commentDB.findById(commentId)
        let comments = []
        commentsDB.forEach(commentdb =>{
            let comment = new Comment(commentdb.body)
            comment.id = commentdb.id
            comments.push(comment)
        })
        return comments
    }
    async updateComment(commentData){
        for(const key in commentData){
            this[key] = commentData[key]
        }
        commentDB.updateComment(this.id,this)
        return this
    }
    async deleteComment(){
        commentDB.deleteComment(this.id)
        return this
    }
}
module.exports = Comment