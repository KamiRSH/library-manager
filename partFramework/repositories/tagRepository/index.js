const loader = require('@partFramework/loader').getInstance()
const { TagModel } = require('../../models/tagModel')
const { tablesName } = require('../../project-config/dev/atlasTablesNameConfig')
const { tagDTO } = require("./tagDTO")
const { TagStatusErrors } = require("../../exceptionHandlers/statusError").error
const { DBResponseToJson } = require("../../utils/dbUtils")
class TagRepository {
    #db



    constructor() {
        this.#db = loader.get('atlasInterface')
    }

    async getById(tagId) {
        const DBResponse = await this.#db.table(tablesName.Tag).select("id", "body").on("id").where(tagId).get()
        const tagsJsonList = DBResponseToJson(DBResponse.body.data.result)
        if (!tagsJsonList.length) {
            throw TagStatusErrors.NotFound(tagId)
        }
        return tagDTO.fromJsonList(tagsJsonList)[0]
    }

    async createTag(tagData) {
        if ((await this.getTags({ "name": tagData.name })).length) {
            throw TagStatusErrors.DuplicateTag(tagData.name)
        }

        const tagObj = new TagModel(tagData)
        const [tagKeys, tagBody] = tagDTO.toAtlasFormat(tagObj)

        tagKeys.splice(tagKeys.indexOf('id_undefined'), 1)
        delete tagBody.id

        const DBResponse = (await this.#db.table(tablesName.Tag).insert({
            keys: tagKeys,
            body: tagBody
        })).body.data.result
        const tagJsonList = DBResponseToJson([{ id: DBResponse.success[0], body: tagData }])
        return tagDTO.fromJsonList(tagJsonList)[0] // returns {success: [tagId], failure: []}

    }

    async getTags(queryString) {
        let keysSearch = []
        let DBResponse;
        if (queryString) {
            for (const [key, val] of Object.entries(queryString))
                keysSearch.push(`${key}_${val}`)
            DBResponse = (await this.#db.table(tablesName.Tag).select("id", 'body').where(keysSearch).get())
        }
        else {
            DBResponse = (await this.#db.table(tablesName.Tag).select("id", 'body').startsWith("name_").get())
        }

        const tagsJsonList = DBResponseToJson(DBResponse.body.data.result)


        return tagDTO.fromJsonList(tagsJsonList)
    }

    async updateTag(tagId, tagData) {
        const tagObj = await this.getById(tagId)

        let [tagKeys, tagBody] = tagDTO.toAtlasFormat(tagObj)

        for (let [prop, val] of Object.entries(tagData)) {
            if (prop == "status") {
                continue
            }
            tagBody[prop] = val
        }

        await this.#db.table(tablesName.Tag).on("id").where(tagId).update({
            keys: tagKeys,
            body: tagBody
        })
        return tagBody
    }

    async deleteTag(tagId) {
        const res = (await this.#db.table(tablesName.Tag).on('id').where(tagId).delete()).body.data.result
        if (!res.success.length)
            throw TagStatusErrors.NotFound(tagId)
        return { id: res.success[0] }

    }

    async changeTagStatus(tagId, status) {
        const allowedStatus = ['accepted', 'rejected', 'pending']
        if (!allowedStatus.includes(status)) throw TagStatusErrors.BadRequest

        const tagObj = await this.getById(tagId)

        tagObj.status = status
        const [tagKeys, tagBody] = tagDTO.toAtlasFormat(tagObj)


        await this.#db.table(tablesName.Tag).on('id').where(tagId).update({
            keys: tagKeys,
            body: tagBody
        })
        return tagBody
    }

}

module.exports = TagRepository