module.exports = {
    f(params) {
        const regConf = new params.Scene('reg9')
        const Profile = require('../../models/profile')

        regConf.enter(async(ctx) => {
            try {
                await ctx.replyWithPhoto(`${ctx.scene.state.avatar}`, params.Extra.markup((markup) => {
                    markup.resize()
                }).caption(params.assets.confirmText(ctx.scene.state)).HTML())
                ctx.reply('Все правильно?', params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton('Так 👍', 'well'),
                        m.callbackButton('Редагувати анкету 📝', 'edit')
                    ])
                ))
            } catch {
                await ctx.replyWithVideo(`${ctx.scene.state.avatar}`, params.Extra.markup((markup) => {
                    markup.resize()
                }).caption(params.assets.confirmText(ctx.scene.state)).HTML())
                ctx.reply('Все правильно?', params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton('Так 👍', 'well'),
                        m.callbackButton('Редагувати анкету 📝', 'edit')
                    ])
                ))
            }
        })
        regConf.action('well', async(ctx) => {
            await params.config.db(true)
            await Profile.deleteOne({ chat_id: ctx.from.id })
            await Profile.create({
                name: ctx.scene.state.name,
                chat_id: ctx.from.id,
                gender: ctx.scene.state.gender,
                interest: ctx.scene.state.interest,
                city: ctx.scene.state.city,
                age: ctx.scene.state.age,
                decsript: ctx.scene.state.decsript,
                avatar: ctx.scene.state.avatar,
                is_active: true,
                strikes: 0,
            })
            await params.config.db(false)

            // ctx.scene.enter('go_main', { host_info: [ctx.scene.state], relations: {}, scaned_city: [] })
        })
        regConf.action('edit', async(ctx) => {
            await params.config.db(true)
            await Profile.create({
                name: ctx.scene.state.name,
                chat_id: ctx.from.id,
                gender: ctx.scene.state.gender,
                interest: ctx.scene.state.interest,
                city: ctx.scene.state.city,
                age: ctx.scene.state.age,
                decsript: ctx.scene.state.decsript,
                avatar: ctx.scene.state.avatar,
                is_active: true,
                strikes: 0,
            })
            await params.config.db(false)

            // params.login.f(params, ctx)
        })
        regConf.on('message', (ctx) => ctx.scene.reenter('reg9'))


        return regConf
    }
}