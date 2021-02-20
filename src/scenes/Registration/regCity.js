module.exports = {
    f(params) {
        const regCity = new params.Scene('reg5')

        regCity.enter((ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('reg.city'))
        })
        regCity.on('text', async(ctx) => {
            ctx.scene.state.city = ctx.message.text
            await ctx.db.User.updateOne({ chat_id: ctx.from.id }, { city: ctx.message.text })
            ctx.scene.enter('reg6', ctx.scene.state)
        })
        regCity.on('message', (ctx) => ctx.scene.reenter('reg5'))

        return regCity
    }
}