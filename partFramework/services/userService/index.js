const User = require("../../models/user")
const UserStatusErrors = require("../../exceptionHandlers/statusError").error.UserStatusErrors
class UserService{
    constructor(){
        if (UserService.instance) {
            return UserService.instance;
        } 
        UserService.instance = this;  
    } 
    async signUp(userData){
        const newUser = new User(userData)
        const existUsers = await User.findUserByKeys({
            "username":newUser.username,
            "email": newUser.email
        })
        if (existUsers.length){
            throw UserStatusErrors.UserAlreadyExists
        }
        if (userData.password != userData.repeatedPassword){
            throw UserStatusErrors.PasswordMismatch
        }
        newUser.roles = ["user", "active"]
        newUser.createUser()
        return newUser
    }
    async signIn(username, password){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        if (existUser[0].password != password){
            throw UserStatusErrors.IncorrectPassword
        }
        return existUser[0]
    }
    async updateUser(username,userData){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        if(userData.hasOwnProperty("email")){
            const existUserEmail = await User.findUserByKeys({
                "email":userData.email
            })
            if (existUserEmail.length){
                throw UserStatusErrors.EmailAlreadyExists
            }
        }
        
        return existUser[0].updateUser(userData)
    }
    async deleteUser(username){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        existUser[0].deleteUser()
        return existUser[0]
    }
    async changeUserActivate(username,activate){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        
        if(activate){
            existUser[0].removeRole("deActive")
            if (existUser[0].hasRole("active")){
                throw UserStatusErrors.RoleAlreadyAssigned
            }
            existUser[0].addRole("active")
        }
        if(!activate){
            existUser[0].removeRole("active")
            if (existUser[0].hasRole("deActive")){
                throw UserStatusErrors.RoleAlreadyAssigned
            }
            existUser[0].addRole("deActive")
        }
        existUser[0].updateUser({})
        return existUser[0]
    }
    async showAllUsers(){
        return await User.findAllUsers();
    }
    async showUserInfo(username){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        delete existUser[0].password;
        return existUser[0]
    }
    async showUserInfoById(id){
        const existUser = await User.findUserById(id)
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        delete existUser[0].password;
        return existUser[0]
    }
    async changeRoleRequest(username, role){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        if (existUser[0].hasRole(role)){
            throw UserStatusErrors.RoleAlreadyAssigned
        }
        if (existUser[0].hasRole("_"+role)){
            throw UserStatusErrors.RoleAlreadyRequested
        }
        existUser[0].addRole("_"+role)
        existUser[0].updateUser({})
        return existUser[0]
    }
    async changeRoleResponse(username,role){
        const existUser = await User.findUserByKeys({
            "username":username
        })
        if (existUser.length === 0){
            throw UserStatusErrors.UserNotFound
        }
        if (existUser[0].hasRole(role)){
            await existUser[0].removeRole(role)
        }
        else{
            if (existUser[0].hasRole("_"+role)){
                await existUser[0].removeRole("_"+role)
            }
            existUser[0].addRole(role)
        }
        existUser[0].updateUser({})
        return existUser[0]
        
    }
    
}
module.exports = UserService