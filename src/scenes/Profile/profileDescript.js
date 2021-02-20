module.exports = {
    f(params) {
        const profileDescript = new params.Scene('prof_menu3')
        const login = require('../../handlers/login')

        profileDescript.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('reg.desc')))
        profileDescript.on('text', async(ctx) => {
            await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { decsript: ctx.message.text })
            login.f(ctx)
        })
        profileDescript.on('message', (ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('reg.desc'))
        })

        return profileDescript
    }
}