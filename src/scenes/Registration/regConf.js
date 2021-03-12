module.exports = {
    f(params) {
        const regConf = new params.Scene('reg9')
        const login = require('../../handlers/login')

        regConf.enter(async(ctx) => {
            try {
                await ctx.replyWithPhoto(`${ctx.scene.state.avatar}`, params.Extra.markup((markup) => {
                    markup.resize()
                }).caption(`<b>${ctx.scene.state.name}, ${ctx.scene.state.age}</b>. ${ctx.scene.state.city} \n\n${ctx.scene.state.decsript}`).HTML())
                ctx.reply(ctx.i18n.t('reg.conf'), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton(ctx.i18n.t('reg.well'), 'well'),
                        m.callbackButton(ctx.i18n.t('reg.edit'), 'edit')
                    ])
                ))
            } catch {
                await ctx.replyWithVideo(`${ctx.scene.state.avatar}`, params.Extra.markup((markup) => {
                    markup.resize()
                }).caption(`<b>${ctx.scene.state.name}, ${ctx.scene.state.age}</b>. ${ctx.scene.state.city} \n\n${ctx.scene.state.decsript}`).HTML())
                ctx.reply(ctx.i18n.t('reg.conf'), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton(ctx.i18n.t('reg.well'), 'well'),
                        m.callbackButton(ctx.i18n.t('reg.edit'), 'edit')
                    ])
                ))
            }
        })
        regConf.action('well', async(ctx) => {
            await ctx.db.Profile.deleteOne({ chat_id: ctx.from.id })
            await ctx.db.Profile.create({
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
                activities: 0,
                activities_block: false,
                likes: 0,
                attraction: 0
            })
            await ctx.db.Relation.deleteMany({ cli_id: ctx.from.id })
            let relations = await ctx.db.Relation.find({ host_id: ctx.from.id }, { cli_id: 1, _id: 0 })
            ctx.scene.enter('action_main', { host_info: [ctx.scene.state], relations, scaned_city: [`${ctx.scene.state.city}`] })
        })
        regConf.action('edit', async(ctx) => {
            await ctx.db.Profile.deleteOne({ chat_id: ctx.from.id })
            await ctx.db.Profile.create({
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
                activities_block: false,
                likes: 0,
                attration: 0
            })
            await ctx.db.Relation.deleteMany({ cli_id: ctx.from.id })
            login.f(ctx)
        })
        regConf.on('message', (ctx) => ctx.scene.reenter('reg9'))


        return regConf
    }
}