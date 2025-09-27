const { TagModel } = require('../../models/tagModel')
exports.tagDTO = class tagDTO {

    static fromJson(tagJson) {
        return new TagModel(tagJson)
    }

    static fromJsonList(tagsJsonList) {
        return tagsJsonList.reduce((pre, tagJson) => {
            pre.push(tagDTO.fromJson(tagJson))
            return pre
        }, [])
    }

    static toAtlasFormat(tagObj) {
        let tagKeys = [], tagBody = {}
        for (let [prop, val] of Object.entries(tagObj)) {
            tagKeys.push(`${prop}_${val}`)
            tagBody[prop] = val
        }
        return [tagKeys, tagBody]
    }
}