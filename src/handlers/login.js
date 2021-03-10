async function login(ctx) {
    ctx.session.user = await ctx.db.Profile.find({ chat_id: ctx.from.id })
    ctx.session.user.length ? updateLastLogin(ctx) : ctx.scene.enter('reg1')
}

async function updateLastLogin(ctx) {
    const moment = require('moment')

    await ctx.db.User.updateOne({ chat_id: ctx.from.id }, { last_login: moment().format('DD.MM.YYYY') })

    getRelations(ctx)
}

async function getRelations(ctx) {
    let relations = await ctx.db.Relation.find({ host_id: ctx.from.id }, { cli_id: 1, _id: 0 })
    relations = relations.concat(await ctx.db.Relation.find({ cli_id: ctx.from.id, host_like: false }, { host_id: 1, _id: 0 }))
        .concat(await ctx.db.Relation.find({ cli_id: ctx.from.id, cli_checked: true }, { host_id: 1, _id: 0 }))

    ctx.session.relations = relations.map(e => e.host_id == undefined ? e = e.cli_id : e = e.host_id)

    getLikes(ctx)
}

async function getLikes(ctx) {
    const host_info = ctx.session.user
    const relations = ctx.session.relations
    const state = { host_info, relations, scaned_city: [`${host_info[0].city}`] }

    if (host_info[0].likes) {
        ctx.scene.enter('action_main', state)
    } else {
        ctx.scene.enter('prof_menu', state)
    }
}

module.exports = login