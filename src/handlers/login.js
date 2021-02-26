module.exports = {
    async f(ctx) {
        const moment = require('moment')
        let user = await ctx.db.Profile.find({ chat_id: ctx.from.id })
        if (user.length) {
            const login = await ctx.db.User.findOne({ chat_id: ctx.from.id }, { last_login: 1, _id: 0 })
            await ctx.db.User.updateOne({ chat_id: ctx.from.id }, { last_login: moment().format('DD.MM.YYYY') }, { new: false })
            try {
                if (login.last_login.split('.')[0] != moment().format('DD')) {
                    await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { activities_block: false })
                    user.activities_block = false
                }
            } catch {
                user.activities_block = false
            }

            let relations = await ctx.db.Relation.find({ host_id: ctx.from.id }, { cli_id: 1, _id: 0 })
            let dislikes = await ctx.db.Relation.find({ cli_id: ctx.from.id, host_like: false }, { host_id: 1, _id: 0 })
            let liked = await ctx.db.Relation.find({ cli_id: ctx.from.id, cli_checked: true }, { host_id: 1, _id: 0 })
            relations = relations.concat(liked)
            relations = relations.concat(dislikes)

            relations.forEach((e, i) => {
                e.host_id = e.cli_id
                delete relations[i].cli_id
            });

            if (user[0].likes) {
                ctx.scene.enter('action_main', { host_info: user, relations: relations, scaned_city: [`${user[0].city}`] })
            } else {
                ctx.scene.enter('prof_menu', { host_info: user, relations: relations, scaned_city: [`${user[0].city}`] })
            }
        } else {
            ctx.scene.enter('reg1')
        }
    }
}