import { userRouter } from "./partController/user/router.js"
import { bookRouter } from "./partController/book/routes.js"

export const routes = (router) => {
    userRouter(router)
    bookRouter(router)
}