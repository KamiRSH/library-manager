const { orderRepository } = require("../../repositories/orderRepository/orderRepository")
const { DBResponseToJson } = require("../../utils/dbUtils")
const { OrderStatusErrors } = require("../../exceptionHandlers/statusError").error

class OrderService {
    #orderRepository
    constructor() {
        // Singleton
        if (OrderService.instance) return OrderService.instance
        this.#orderRepository = new orderRepository()
        OrderService.instance = this
    }

    async createOrder(userId) {
        return await this.#orderRepository.createOrder(userId)
    }

    async addOrRemoveBook(orderJson, books) {        
        for (let [bookId, bookQuantity] of Object.entries(books)) {
            if (orderJson.books[bookId]) {
                orderJson.books[bookId] += bookQuantity
                if (orderJson.books[bookId] == 0) {
                    delete orderJson.books[bookId]
                }
            } else {
                orderJson.books[bookId] = bookQuantity
            }
        }
        if (!Object.keys(orderJson.books).length){
            await this.deleteOrder(orderJson.userId)
            return "Empty order. Order deleted"
        }
        const newOrderJson = await this.#orderRepository.addOrRemoveBook(orderJson)
        return newOrderJson
    }

    async payment(orderJson) {
        return await this.#orderRepository.changeOrderStatus(orderJson, 'paid')

    }

    async deleteOrder(userId) {
        const DBResponse = await this.#orderRepository.getOrdersByUserId(userId, 'inProgress')
        if (!DBResponse.length) throw OrderStatusErrors.NoOrderWithSpecifiedStatus(userId, 'inProgress')
        const orderJson = DBResponseToJson(DBResponse)[0]
        return await this.#orderRepository.deleteOrder(orderJson.id)
    }

    async getOrdersByUserId(userId, status) {

        const DBResponse = await this.#orderRepository.getOrdersByUserId(userId, status)
        if (!DBResponse.length) {
            if (status)
                throw { message: `User with id: ${userId} doesn't have any order status: ${status}` }
            throw { message: `User with id: ${userId} doesn't have any order` }
        }
        return DBResponseToJson(DBResponse)
    }

    async getOrders(queryString) {
        return await this.#orderRepository.getOrders(queryString)
    }

    async finalizeOrder(userId) {
        const DBResponse = await this.#orderRepository.getOrdersByUserId(userId, 'inProgress')
        if (!DBResponse.length) throw OrderStatusErrors.NoOrderWithSpecifiedStatus(userId, 'inProgress')
        const orderJson = DBResponseToJson(DBResponse)[0]
        return this.#orderRepository.changeOrderStatus(orderJson, 'pendingForPayment')
    }

};
module.exports = OrderService