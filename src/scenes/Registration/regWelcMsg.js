module.exports = {
    f(params) {
        const regWelcMsg = new params.Scene('reg1')
        const moment = require('moment')

        regWelcMsg.enter(async(ctx) => {
            ctx.replyWithHTML(ctx.i18n.t('greeting'), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('Так 👍', 'okay')
                ])
            ))
            let user = await ctx.db.User.findOne({ chat_id: ctx.from.id })
            if (!user) {
                await ctx.db.User.create({ chat_id: ctx.from.id, name: ctx.from.first_name, last_login: moment().format('DD.MM.YYYY') })
                console.log(`Here's new one - ${ctx.from.first_name}`)
            }
        })
        regWelcMsg.action('okay', (ctx) => ctx.scene.enter(`reg2`))

        return regWelcMsg
    }
}