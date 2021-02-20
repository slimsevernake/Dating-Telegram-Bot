module.exports = {
    f(params) {
        const regName = new params.Scene('reg6')

        regName.enter((ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('reg.name'), params.Extra.markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton(ctx.i18n.t('reg.name_btn'), 'first_name')
                ])
            ))
        })
        regName.action('first_name', (ctx) => {
            ctx.scene.state.name = ctx.from.first_name
            ctx.scene.enter('reg7', ctx.scene.state)
        })
        regName.on('text', (ctx) => {
            ctx.scene.state.name = ctx.message.text
            ctx.scene.enter('reg7', ctx.scene.state)
        })
        regName.on('message', (ctx) => {
            ctx.scene.reenter('reg6')
        })



        return regName
    }
}