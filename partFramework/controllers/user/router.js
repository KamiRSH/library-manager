export const userRouter = (router) => {
    router.setGroup(function(){
        router.setRoute('/signup', 'user.signup').method('POST')
        router.setRoute('/signin', 'user.login').method('POST')
        router.setRoute('/:id', 'user.editUser').method('PATCH')
        router.setRoute('/:id', 'user.removeUser').method('DELETE')
        router.setRoute('/:id', 'user.profile').method('GET')
    }).prefix("/users")
}
