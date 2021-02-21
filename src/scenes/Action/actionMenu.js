module.exports = {
    f(params) {
        const actionMenu = new params.Scene('action_menu')

        actionMenu.enter(async(ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('action.menu'), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(ctx.i18n.t('action.first'), 'profile'),
                        m.callbackButton(ctx.i18n.t('action.second'), 'close')
                    ],
                    [m.callbackButton(ctx.i18n.t('action.third'), 'go')]
                ])
            ))

        })
        actionMenu.action('go', (ctx) => ctx.scene.enter('action_main', ctx.scene.state))
        actionMenu.action('profile', (ctx) => ctx.scene.enter('prof_menu', ctx.scene.state))
        actionMenu.action('close', (ctx) => {
            ctx.reply(ctx.i18n.t('close.main'), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton(ctx.i18n.t('close.confirm'), 'close_confirm'),
                    m.callbackButton(ctx.i18n.t('close.reject'), 'go_back')
                ])
            ))
        })

        actionMenu.action('close_confirm', async(ctx) => {
            ctx.reply(ctx.i18n.t('close.bye'))
            await ctx.db.Profile.deleteOne({ chat_id: ctx.from.id }, { is_active: false })
            ctx.scene.leave()
        })
        actionMenu.action('go_back', (ctx) => ctx.scene.enter('action_menu', ctx.scene.state))


        return actionMenu
    }
}