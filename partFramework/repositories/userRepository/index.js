const loader = require("@partFramework/loader").getInstance()
const { tablesName } = require("../../project-config/dev/atlasTablesNameConfig")
class UserDB {
    constructor(){
        this.atlas = loader.get("atlasInterface")
    }
    async findById(id){
        const data = await (this.atlas.table(tablesName.User).on("id"),select("id","body").where(id).get())
        return data.body.data.result;
    }
    async findByKeys(params){
        let keys = []
        for(const key in params){
            keys.push(key+"_"+params[key])
        }
        const data = await (this.atlas.table(tablesName.User).select("id","body").orWhere(keys).get())
        return data.body.data.result;
    }
    async findAllUsers(){
        const data = await this.atlas.table(tablesName.User).select("id","body").startsWith("username_").get()
        return data.body.data.result;
    } 
    async insertUser(user){
        const keys = [
            "username_" + user?.username,
            "email_"+user?.email,
        ]
        const insertData = this.atlas.table(tablesName.User).insert({
            keys: keys,
            body: JSON.stringify(user),
        });
        return user
    }
    async deleteUser(id){
        const deleteData = this.atlas.table(tablesName.User).on("id").where(id).delete()
        return true
    } 
    async updateUser(id,user){
        const keys = [
            "username_" + user?.username,
            "email_"+user?.email,
        ]
        const updateData = this.atlas.table(tablesName.User).on("id").where(id).update({
            keys: keys,
            body: JSON.stringify(user),
        });
        return user 
    }
}
module.exports = UserDB