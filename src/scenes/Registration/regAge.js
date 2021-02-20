module.exports = {
    f(params) {
        const regAge = new params.Scene('reg2')

        regAge.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('reg.age')))
        regAge.on('text', async(ctx) => {
            if (isNaN(parseInt(ctx.message.text))) {
                ctx.replyWithHTML(ctx.i18n.t('reg.age_error'))
            } else {
                await ctx.db.User.updateOne({ chat_id: ctx.from.id }, { age: ctx.message.text })
                ctx.scene.enter(`reg3`, { age: ctx.message.text })
            }
        })

        return regAge
    }
}