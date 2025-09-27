const TagRepository = require("../../repositories/tagRepository")
class TagService {
    constructor() {
        this.tagRepository = new TagRepository()
    }

    async getById(tagId) {
        return await this.tagRepository.getById(tagId)
    }

    async createTag(tagData) {
        return await this.tagRepository.createTag(tagData)
    }

    async getTags(queryString) {
        return await this.tagRepository.getTags(queryString)
    }

    async updateTag(tagId, tagData) {
        if (tagData.name) {
            // **Comment: check if new tagName already exists
            if ((await this.getTags({ "name": tagData.name })).length)
                throw TagStatusErrors.DuplicateTag(tagData.name)
        }
        return await this.tagRepository.updateTag(tagId, tagData)
    }

    async deleteTag(tagId) {
        return await this.tagRepository.deleteTag(tagId)
    }

    async changeTagStatus(tagId, status) {
        return await this.tagRepository.changeTagStatus(tagId, status)
    }
}
module.exports = TagService