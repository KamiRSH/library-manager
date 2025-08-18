import { constants } from "fs"
import fs from "fs/promises"

export class FileSys{
    constructor() {
        if (FileSys.instance){
            return FileSys.instance
        }
        FileSys.instance = this
    }

  async read(file){
    try{
        const data = await fs.readFile(file, "utf8")
        return JSON.parse(data)
    }catch(err){
        console.error("reading error:", err)
    }
  }
  
  async write(fileName, content){
    try{
        await fs.writeFile(fileName, JSON.stringify(content))
    }catch(err){
        console.error("writing error:", err)
    }
  }

  async appnd(fileName, content){
    try{
        await fs.appendFile(fileName, JSON.stringify(content))
    }catch(err){
        console.error("appending error:", err)
    }
  }

  async exist(fileName){
    try{
        await fs.access(fileName, constants.F_OK)
        return true
    }catch(err){
        return false
    }
  }

}