module.exports = {
    f(params) {
        const regWelcMsg = new params.Scene('reg1')

        regWelcMsg.enter((ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('greeting'), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('Так 👍', 'okay')
                ])
            ))
            ctx.db.User.create({ chat_id: ctx.from.id })
        })
        regWelcMsg.action('okay', (ctx) => ctx.scene.enter(`reg2`))

        return regWelcMsg
    }
}