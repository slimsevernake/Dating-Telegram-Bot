module.exports = {
    f(params) {
        const regIntr = new params.Scene('reg4')

        regIntr.enter((ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('reg.int'), params.Extra.markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton(ctx.i18n.t('reg.int_boys'), 'boys'),
                    m.callbackButton(ctx.i18n.t('reg.int_girls'), 'girls'),
                    m.callbackButton(ctx.i18n.t('reg.int_both'), 'both')
                ])
            ))
        })
        regIntr.action('boys', (ctx) => {
            ctx.scene.state.interest = 1
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.action('girls', (ctx) => {
            ctx.scene.state.interest = 0
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.action('both', (ctx) => {
            ctx.scene.state.interest = 2
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.on('message', (ctx) => ctx.scene.reenter('reg4'))

        return regIntr
    }
}