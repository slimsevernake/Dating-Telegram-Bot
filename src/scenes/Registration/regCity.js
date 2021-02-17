module.exports = {
    f(params){
        const regCity = new params.Scene('reg5')

        regCity.enter((ctx) => {
            ctx.reply(`Гаразд, а з якого ти міста?`)
        })
        regCity.on('text', (ctx) => {
            ctx.scene.state.city = ctx.message.text
            ctx.scene.enter('reg6', ctx.scene.state)
        })
        regCity.on('message', (ctx) => ctx.scene.reenter('reg5'))

        return regCity
    }
}