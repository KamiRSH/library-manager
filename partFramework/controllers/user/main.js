import BaseController from '@partFramework/baseController'
import { DTO } from "./model.js"
import { Core } from "./core.js"
const dto = new DTO()
const core = new Core()

export class userController extends BaseController{
    constructor(core, schema, config){
    super(core, schema, config);
  }

  async signUp(userData, token,trackingHeaders){
    const objDetail = dto.jDetailToObjUser(req.body)
    // const data = await this.#userService.signUp(userData);
    await this.authentication.addUser(userData.username, userData.password,trackingHeaders)
    return this.authentication.createToken(data);
  }
}