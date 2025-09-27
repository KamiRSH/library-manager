const loader = require("@partFramework/loader").getInstance()
const JWTService = require("./JWTService")
const config = require("./config").config
class Authentication{
    constructor(){
        this.authentication = loader.get("authenticationInterface")
        this.system = config.system
        this.JWTService = new JWTService(config.secretKey,config.expiresIn)
        
    }
    async addUser(username, password,trackingHeaders){
        return await this.authentication.addUser({"username" : username , "password": password},'active',this.system, trackingHeaders)
        .then(function (data) {
           return data
          })
        .fail(function (data) {
          throw {
            "message":data,
            "statusCode":400
          }
        });   
    }
    async removeUser(username, trackingHeaders){
      return await this.authentication.addUser({"username" : username},'active',this.system, trackingHeaders)
        .then(function (data) {
           return data
          })
        .fail(function (data) {
          throw {
            "message":data,
            "statusCode":400
          }
        });   
    }
    async setStatus(username, status, trackingHeaders){
      return await this.authentication.setStatus({"username" : username},status,this.system, trackingHeaders)
        .then(function (data) {
           return data
          })
        .fail(function (data) {
          throw {
            "message":data,
            "statusCode":400
          }
        });
    }
    async createToken(inp) {
        const pyload = JSON.parse(JSON.stringify(inp));
        return this.JWTService.generateToken(pyload)
    }
    async authenticateToken(token, trackingHeaders){
      const tokenData = await this.JWTService.verifyToken(token);
      return await this.authentication.authenticate({"username": tokenData.username,"password": tokenData.password}, this.system,trackingHeaders)
      .then(function (data) {
        return data
       })
     .fail(function (data) {
       throw {
         "message":data,
         "statusCode":400
       }
     }); 
    }
    async verifyToken(token){
      return await this.JWTService.verifyToken(token);
    }
    async editUser(username,password, trackingHeaders){
      return await this.authentication.editUser({"username" : username},{"username" : username,"password":password},this.system, trackingHeaders)
        .then(function (data) {
           return data
          })
        .fail(function (data) {
          throw {
            "message":data,
            "statusCode":400
          }
        });
    }
}
module.exports = Authentication