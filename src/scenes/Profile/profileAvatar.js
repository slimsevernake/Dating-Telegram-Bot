module.exports = {
    f(params) {
        const profileAvatar = new params.Scene('prof_menu2')
        const login = require('../../handlers/login')

        profileAvatar.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('reg.avatar')))
        profileAvatar.on('photo', async(ctx) => {
            await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { avatar: ctx.message.photo[0].file_id })
            login.f(ctx)
        })
        profileAvatar.on('video', async(ctx) => {
            await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { avatar: ctx.message.video.file_id })
            login.f(ctx)
        })
        profileAvatar.on('message', (ctx) => {
            ctx.reply(ctx.replyWithHTML(ctx.i18n.t('reg.avatar')))
        })

        return profileAvatar
    }
}