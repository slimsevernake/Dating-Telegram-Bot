const scene = params => {
    const likelyMain = new params.Scene('liked_main')
    const login = require('../../handlers/login')

    likelyMain.enter(async(ctx) => {
        await ctx.reply(ctx.i18n.t('likely.start'))
        cliShowing(ctx)
    })
    likelyMain.action('yes', async(ctx) => {
        await ctx.db.Relation.updateOne({ cli_id: ctx.from.id, host_id: ctx.scene.state.likes[0].host_id }, { cli_checked: true })
        await matchHandler(ctx, params)
        ctx.scene.state.likes.shift()
        if (ctx.scene.state.likes.length) {
            cliShowing(ctx)
        } else {
            delete ctx.scene.state.host
            delete ctx.scene.state.likes
            login(ctx)
        }
    })
    likelyMain.action('no', async(ctx) => {
        await ctx.db.Relation.updateOne({ cli_id: ctx.from.id, host_id: ctx.scene.state.likes[0].host_id }, { cli_checked: true })
        ctx.scene.state.likes.shift()
        if (ctx.scene.state.likes.length) {
            cliShowing(ctx)
        } else {
            delete ctx.scene.state.host
            delete ctx.scene.state.likes
            login.f(ctx)
        }
    })
    likelyMain.action('report', async(ctx) => {
        await ctx.db.Relation.create({
            host_id: ctx.from.id,
            cli_id: ctx.scene.state.likes[0].host_id,
            host_like: false,
            cli_checked: false,
        })
        ctx.scene.state.likes.shift()
        if (ctx.scene.state.likes) {
            cliShowing(ctx)
        } else {
            delete ctx.scene.state.host
            delete ctx.scene.state.likes
            login.f(ctx)
        }
    })
    likelyMain.action('go_exit', (ctx) => login.f(ctx))

    async function matchHandler(ctx, params) {
        ctx.replyWithHTML(`${ctx.i18n.t('likely.climatch')} <a href="tg://user?id=${ctx.scene.state.host.chat_id}">${ctx.scene.state.host.name}</a>`)
        try {
            await ctx.telegram.sendMessage(ctx.scene.state.host.chat_id, `${ctx.i18n.t('likely.hostmatch')} <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>`, params.Extra.HTML())
        } catch (err) {
            if (err.response && err.response.error_code === 403) {
                await params.userDeleting(ctx, ctx.scene.state.host.chat_id)
            } else { console.log(err.message) }
        }
    }

    return likelyMain
}

async function cliShowing(ctx) {
    let profile = await ctx.db.Profile.find({ chat_id: ctx.scene.state.likes[0].host_id })
    ctx.scene.state.host = profile[0]
    if (ctx.scene.state.likes[0].msg_text == undefined) {
        showProfile(ctx, `<b>${profile[0].name}, ${profile[0].age}</b>. ${profile[0].city} \n\n${profile[0].decsript}`, profile[0])
    } else {
        showProfile(ctx, `<b>${profile[0].name}, ${profile[0].age}</b>. ${profile[0].city} \n\n💌 Повідомелння від <b>${profile[0].name}</b>:\n${ctx.scene.state.likes[0].msg_text}`, profile[0])
    }
}

async function showProfile(ctx, message, cli_info) {
    const Extra = require('telegraf/extra')

    try {
        await ctx.replyWithPhoto(`${cli_info.avatar}`, Extra.markup((markup) => {
            markup.resize()
        }).caption(message).HTML().markup((m) =>
            m.inlineKeyboard([
                [
                    m.callbackButton(ctx.i18n.t('action.like'), 'yes'),
                    m.callbackButton(ctx.i18n.t('action.dislike'), 'no')
                ],
                [m.callbackButton(ctx.i18n.t('action.report'), 'report'),
                    m.callbackButton(ctx.i18n.t('action.exit'), 'go_exit')
                ]
            ])
        ))
    } catch {
        await ctx.replyWithVideo(`${cli_info.avatar}`, Extra.markup((markup) => {
            markup.resize()
        }).caption(message).HTML().markup((m) =>
            m.inlineKeyboard([
                [
                    m.callbackButton(ctx.i18n.t('action.like'), 'yes'),
                    m.callbackButton(ctx.i18n.t('action.dislike'), 'no')
                ],
                [m.callbackButton(ctx.i18n.t('action.report'), 'report'),
                    m.callbackButton(ctx.i18n.t('action.exit'), 'go_exit')
                ]
            ])
        ))
    }
}

module.exports = scene