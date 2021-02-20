module.exports = {
    f(params) {
        const regGender = new params.Scene('reg3')

        regGender.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('reg.sex'), params.Extra.markup((m) =>
            m.inlineKeyboard([
                m.callbackButton(ctx.i18n.t('reg.sex_boy'), 'boy'),
                m.callbackButton(ctx.i18n.t('reg.sex_girl'), 'girl')
            ])
        )))
        regGender.action('boy', (ctx) => {
            ctx.scene.state.gender = 1
            ctx.scene.enter('reg4', ctx.scene.state)
        })
        regGender.action('girl', (ctx) => {
            ctx.scene.state.gender = 0
            ctx.scene.enter('reg4', ctx.scene.state)
        })
        regGender.on('message', (ctx) => ctx.scene.reenter('reg3'))

        return regGender
    }
}