const { OrderModel } = require('../../models/orderModel')
exports.OrderDTO = class OrderDTO {
    static fromJson(orderJson) {
        return new OrderModel(orderJson)
    }

    static fromJsonList(ordersJsonList) {
        return ordersJsonList.reduce((pre, orderJson) => {
            pre.push(OrderDTO.fromJson(orderJson))
            return pre
        }, [])
    }

    static toAtlasFormat(orderObj) {
        let orderKeys = [], orderBody = {}
        for (let [prop, val] of Object.entries(orderObj)) {
            if (prop == 'userId' || prop == 'status')
                orderKeys.push(`${prop}_${val}`)
            if (val != undefined)
                orderBody[prop] = val
        }
        return [orderKeys, orderBody]
    }
}