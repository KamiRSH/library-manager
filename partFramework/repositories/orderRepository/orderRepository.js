const { OrderModel } = require("../../models/orderModel");
const { OrderDTO } = require("./orderDTO");

const loader = require("@partFramework/loader").getInstance();
const { tablesName } = require("../../project-config/dev/atlasTablesNameConfig")
const { DBResponseToJson } = require("../../utils/dbUtils")
const { OrderStatusErrors } = require("../../exceptionHandlers/statusError").error

exports.orderRepository = class orderRepository {
    #db
    constructor() {
        if (orderRepository._instance)
            return orderRepository._instance
        this.#db = loader.get("atlasInterface")
        orderRepository._instance = this
    }

    async getOrdersByUserId(userId,status){
        let DBResponse
        if (status)
            DBResponse = await this.#db.table(tablesName.Order).select("id", "body").where([`userId_${userId}`, `status_${status}`]).get()
        else
            DBResponse = await this.#db.table(tablesName.Order).select("id", "body").where(`userId_${userId}`).get()


        return DBResponse.body.data.result
    }
    async createOrder(userId) {
        //TODO:
        // check if user already has a pending order

        const orderObj = OrderDTO.fromJson({ "userId": userId })
        const [orderKeys, orderBody] = OrderDTO.toAtlasFormat(orderObj)

        /** Comment:
         * orderObj: {id: undefined, userId: 1234, books: undefined, status: pending, }
         */


        const DBResponse = (await this.#db.table(tablesName.Order).insert({
            keys: orderKeys,
            body: orderBody
        })).body.data.result
        const ordersJson = DBResponseToJson([{ id: DBResponse.success[0], body: orderBody }])[0]
        return ordersJson
    }

    async addOrRemoveBook(orderJson) { // books: list of bookIds

        // TODO
        // this data should be store in separate database (not the main db)
        const orderObj = OrderDTO.fromJson(orderJson)
        const orderId = orderJson.id
        delete orderJson.id
        const [orderKeys, orderBody] = OrderDTO.toAtlasFormat(orderObj)
        // const orderKey = [`userId_${orderJson.userId}`, `status_${orderJson.status}`]
        const DBResponse = (await this.#db.table(tablesName.Order).on('id').where(orderId).update({
            keys: orderKeys,
            body: orderBody
        })).body.data.result
        const res = DBResponseToJson([{ id: DBResponse.success[0], body: orderJson }])[0]
        return res


        // check book quantity from bookService

    }

    async deleteOrder(orderId){
        const DBResponse = (await this.#db.table(tablesName.Order).on('id').where(orderId).delete()).body.data.result
        return {id: DBResponse.success[0]}
    }

    async changeOrderStatus(orderJson, status){
        const orderObj = OrderDTO.fromJson(orderJson)
        orderObj.status = status
        const [orderKeys, orderBody] = OrderDTO.toAtlasFormat(orderObj)
        const orderId = orderBody.id
        delete orderBody.id
        const DBResponse = (await this.#db.table(tablesName.Order).on("id").where(orderId).update({
            keys: orderKeys,
            body: orderBody
        })).body.data.result
        return {id: DBResponse.success[0], ...orderBody}
    }

    async getOrders(queryString){
        let keysSearch = []
        let DBResponse;
        if (queryString) {
            for (const [key, val] of Object.entries(queryString))
                keysSearch.push(`${key}_${val}`)
            DBResponse = (await this.#db.table(tablesName.Order).select("id", 'body').where(keysSearch).get())
        }
        else {
            DBResponse = (await this.#db.table(tablesName.Order).select("id", 'body').startsWith("userId_").get())
        }

        const ordersJsonList = DBResponseToJson(DBResponse.body.data.result)


        return OrderDTO.fromJsonList(ordersJsonList)
    }
}