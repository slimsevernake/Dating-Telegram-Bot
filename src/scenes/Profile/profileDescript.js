module.exports = {
    f(params) {
        const profileDescript = new params.Scene('prof_menu3')
        const login = require('../../handlers/login')

        profileDescript.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('reg.desc')))
        profileDescript.on('text', async(ctx) => {
            ctx.message.text = ctx.message.text.replace(/\./g, ' ');
            ctx.scene.state.decsript = ctx.message.text.replace(/@/g, ' ');
            await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { decsript: ctx.scene.state.decsript })
            login.f(ctx)
        })
        profileDescript.on('message', (ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('reg.desc'))
        })

        return profileDescript
    }
}