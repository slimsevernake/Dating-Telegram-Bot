module.exports = {
    f(params) {
        const regWelcMsg = new params.Scene('reg1')

        regWelcMsg.enter((ctx) => ctx.reply(params.assets.welcomemsg(ctx), params.Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                m.callbackButton('Так 👍', 'okay')
            ])
        )))
        regWelcMsg.action('okay', (ctx) => ctx.scene.enter(`reg2`))

        return regWelcMsg
    }
}