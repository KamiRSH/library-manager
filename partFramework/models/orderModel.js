// #NOTE
// order should have a `price` property which is calculated from sum of books' prices
exports.OrderModel = class OrderModel {
    static #fields = ['id', 'userId', 'books', 'status']
    constructor(orderData) {
        for (const key of OrderModel.#fields){
            this[key] = orderData[key]
        }
        if (!orderData.status)
            this.status = 'inProgress'
    }
}