exports.TagModel = class TagModel{
    static #fields = ['id', 'name', 'status']
    constructor(tagData){
        for (const key of TagModel.#fields){
            this[key] = tagData[key]
        }
        if (!tagData.status)
            this.status = 'pending'
    }
}