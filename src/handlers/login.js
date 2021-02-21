module.exports = {
    async f(ctx) {
        let user = await ctx.db.Profile.find({ chat_id: ctx.from.id })
        if (user.length) {
            let relations = await ctx.db.Relation.find({ host_id: ctx.from.id }, { cli_id: 1, _id: 0 })
            let dislikes = await ctx.db.Relation.find({ cli_id: ctx.from.id, host_like: false }, { host_id: 1, _id: 0 })
            let liked = await ctx.db.Relation.find({ cli_id: ctx.from.id, cli_checked: true }, { host_id: 1, _id: 0 })
                // relations = relations.concat(liked)
                // relations = relations.concat(dislikes)

            relations.forEach((e, i) => {
                e.host_id = e.cli_id
                delete relations[i].cli_id
            });

            ctx.scene.enter('prof_menu', { host_info: user, relations: relations, scaned_city: [`${user[0].city}`] })
        } else {
            ctx.scene.enter('reg1')
        }
    }
}