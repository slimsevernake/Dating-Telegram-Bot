const scene = params => {
    const profileMenu = new params.Scene('prof_menu')

    profileMenu.enter(async(ctx) => {
        try {
            await ctx.replyWithPhoto(`${ctx.scene.state.host_info[0].avatar}`, params.Extra.markup((markup) => {
                markup.resize()
            }).caption(`<b>${ctx.scene.state.host_info[0].name}, ${ctx.scene.state.host_info[0].age}</b>. ${ctx.scene.state.host_info[0].city} \n\n${ctx.scene.state.host_info[0].decsript}`).HTML())
        } catch {
            await ctx.replyWithVideo(`${ctx.scene.state.host_info[0].avatar}`, params.Extra.markup((markup) => {
                markup.resize()
            }).caption(`<b>${ctx.scene.state.host_info[0].name}, ${ctx.scene.state.host_info[0].age}</b>. ${ctx.scene.state.host_info[0].city} \n\n${ctx.scene.state.host_info[0].decsript}`).HTML())
        }

        ctx.replyWithHTML(ctx.i18n.t('profile.main'), params.Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                [
                    m.callbackButton('📋', 'prof_menu1'),
                    m.callbackButton('📸 ', 'prof_menu2'),
                    m.callbackButton('📝', 'prof_menu3')
                ],
                [m.callbackButton(ctx.i18n.t('profile.goon'), 'prof_menu4')]
            ])
        ))
    })
    profileMenu.action('prof_menu1', (ctx) => ctx.scene.enter('reg2', ctx.scene.state))
    profileMenu.action('prof_menu2', (ctx) => ctx.scene.enter('prof_menu2'))
    profileMenu.action('prof_menu3', (ctx) => ctx.scene.enter('prof_menu3'))
    profileMenu.action('prof_menu4', (ctx) => ctx.scene.enter('action_main', ctx.scene.state))


    return profileMenu
}

module.exports = scene