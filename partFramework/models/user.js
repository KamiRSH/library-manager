const UserDB = require("../repositories/userRepository/index")

const userDB = new UserDB()
 
class User {
    constructor(userData) {
        for(const key in userData){
            this[key] = userData[key]
        }
    } 
    createUser(){
        delete this.repeatedPassword
        userDB.insertUser(this)
        return true
    }
    static async findUserByKeys(params){
        const usersDB = await userDB.findByKeys(params)
        let users = []
        usersDB.forEach(userdb =>{
            let user = new User(userdb.body)
            user.id = userdb.id
            users.push(user)

        })
        return users
    }
    async updateUser(userData){
        for(const key in userData){
            this[key] = userData[key]
        }
        userDB.updateUser(this.id,this)
        return this
    }
    async deleteUser(){
        userDB.deleteUser(this.id)
        return this
    }
    static async findAllUsers(){
        const usersDB = await userDB.findAllUsers()
        let users = []
        usersDB.forEach(userdb =>{
            let user = new User(userdb.body)
            user.id = userdb.id
            delete user.password 
            users.push(user)

        })
        return users
    }
    static async findUserById(id){
        const usersDB = await userDB.findById(id)
        let users = []
        usersDB.forEach(userdb =>{
            let user = new User(userdb.body)
            user.id = userdb.id
            delete user.password 
            users.push(user)

        })
        return users
    }
    addRole(role) {
        if (!this.roles.includes(role)) {
            this.roles.push(role);
        }
    }
    removeRole(role) {
        const index = this.roles.indexOf(role);
        if (index > -1) {
            this.roles.splice(index, 1);
        } 
    }
    hasRole(roleName) {
        return this.roles.some(role => role === roleName);
    }
}
module.exports = User