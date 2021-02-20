module.exports = {
    f(params) {
        const actionMain = new params.Scene('action_main')
        const getProfile = require('../../handlers/getprofile')

        actionMain.enter(async(ctx) => {
            let likes = await ctx.db.Relation.find({ cli_id: ctx.from.id, host_like: true, cli_checked: false })
            if (likes.length) {
                ctx.scene.state.likes = likes
                ctx.scene.enter('liked_main', ctx.scene.state)
            } else {
                getProfile.f(ctx)
            }
        })

        actionMain.action('yes', async(ctx) => {
            await ctx.db.Relation.create({
                host_id: ctx.from.id,
                cli_id: ctx.scene.state.cli_info.chat_id,
                host_like: true,
                cli_checked: false
            })
            await ctx.scene.state.relations.push({ cli_id: ctx.scene.state.cli_info.chat_id })
            ctx.scene.reenter('action_main', ctx.scene.state)
        })
        actionMain.action('no', async(ctx) => {
            await ctx.db.Relation.create({
                host_id: ctx.from.id,
                cli_id: ctx.scene.state.cli_info.chat_id,
                host_like: false,
                cli_checked: false
            })
            await ctx.scene.state.relations.push({ cli_id: ctx.scene.state.cli_info.chat_id })
            ctx.scene.reenter('action_main', ctx.scene.state)
        })
        actionMain.action('mail', (ctx) => {
            ctx.scene.enter('action_mail', ctx.scene.state)
        })
        actionMain.action('report', async(ctx) => {
            if (ctx.scene.state.cli_info.strikes > 3) {
                await ctx.db.Profile.updateOne({ chat_id: ctx.scene.state.cli_info.chat_id }, { is_active: false })
                await await ctx.db.Relation.create({
                    host_id: ctx.from.id,
                    cli_id: ctx.scene.state.cli_info.chat_id,
                    host_like: false,
                    cli_checked: false
                })
                await ctx.scene.state.relations.push({ cli_id: ctx.scene.state.cli_info.chat_id })
                ctx.scene.reenter('action_main', ctx.scene.state)
            } else {
                await ctx.db.Profile.updateOne({ chat_id: ctx.scene.state.cli_info.chat_id }, { strikes: ctx.scene.state.cli_info.strikes + 1 })
                await await ctx.db.Relation.create({
                    host_id: ctx.from.id,
                    cli_id: ctx.scene.state.cli_info.chat_id,
                    host_like: false,
                    cli_checked: false
                })
                await ctx.scene.state.relations.push({ cli_id: ctx.scene.state.cli_info.chat_id })
                ctx.scene.reenter('action_main', ctx.scene.state)
            }
        })
        actionMain.action('go_exit', (ctx) => ctx.scene.enter('action_menu', ctx.scene.state))


        return actionMain
    }
}