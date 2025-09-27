const loader = require("@partFramework/loader").getInstance()
const { tablesName } = require("../../project-config/dev/atlasTablesNameConfig")
class CommentDB {
    constructor(){
        this.atlas = loader.get("atlasInterface")
    }
    async insertComment(comment){
        const keys = [
            "bookId_" + comment?.bookId,
            "userId_"+comment?.userId,
            "status_"+comment?.status
        ]
        const insertData = this.atlas.table(tablesName.Comment).insert({
            keys: keys,
            body: JSON.stringify(comment),
        });
        return comment
    }
    async findByKeys(params){
        let keys = []
        for(const key in params){
            keys.push(key+"_"+params[key])
        }
        const data = await (this.atlas.table(tablesName.Comment).select("id","body").where(keys).get())
        return data.body.data.result;
    }
    async findById(commentId){
        const data = await (this.atlas.table(tablesName.Comment).on("id").select("id","body").where(commentId).get())
        return data.body.data.result;
    }
    async updateComment(id, comment){
        const keys = [
            "bookId_" + comment?.bookId,
            "userId_"+comment?.userId,
            "status_"+comment?.status
        ]
        const updateData = this.atlas.table(tablesName.Comment).on("id").where(id).update({
            keys: keys,
            body: JSON.stringify(comment),
        });
        return comment
    }
    async deleteComment(id){
        const deleteData = this.atlas.table(tablesName.Comment).on("id").where(id).delete()
        return true
    } 
}

module.exports = CommentDB