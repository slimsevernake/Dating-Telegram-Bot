const scene = params => {
    const actionMain = new params.Scene('action_main')
    const getProfile = require('../../handlers/getprofile')

    actionMain.enter(async(ctx) => {
        const likes = await ctx.db.Relation.find({ cli_id: ctx.from.id, host_like: true, cli_checked: false })
        if (likes.length) {
            ctx.scene.state.likes = likes
            await ctx.db.Profile.updateOne({ chat_id: ctx.from.id }, { likes: 0 })
            ctx.scene.enter('liked_main', ctx.scene.state)
        } else {
            getProfile(ctx)
        }
    })

    actionMain.action('yes', async(ctx) => {
        // await newRelation(ctx, true)
        await sendLike(ctx, ctx.scene.state.cli_info)

        ctx.scene.reenter('action_main', ctx.scene.state)
    })

    actionMain.action('no', async(ctx) => {
        await newRelation(ctx, false)

        ctx.scene.reenter('action_main', ctx.scene.state)
    })

    actionMain.action('mail', (ctx) => {
        ctx.scene.enter('action_mail', ctx.scene.state)
    })

    actionMain.action('report', async(ctx) => {
        if (ctx.scene.state.cli_info.strikes > 3) {
            await ctx.db.Profile.updateOne({ chat_id: ctx.scene.state.cli_info.chat_id }, { is_active: false })
        } else {
            await ctx.db.Profile.updateOne({ chat_id: ctx.scene.state.cli_info.chat_id }, { strikes: ctx.scene.state.cli_info.strikes + 1 })
        }
        await newRelation(ctx, false)

        ctx.scene.reenter('action_main', ctx.scene.state)
    })

    actionMain.action('go_exit', (ctx) => ctx.scene.enter('action_menu', ctx.scene.state))

    async function newRelation(ctx, like) {
        await ctx.db.Relation.create({
            host_id: ctx.from.id,
            cli_id: ctx.scene.state.cli_info.chat_id,
            host_like: like,
            cli_checked: false
        })
        await ctx.scene.state.relations.push(ctx.scene.state.cli_info.chat_id)
    }

    async function sendLike(ctx, cli) {
        await ctx.db.Profile.updateOne({ chat_id: cli.chat_id }, { $inc: { likes: 1 } }, { returnNewDocument: true, useFindAndModify: false })
        await ctx.db.Profile.updateOne({ chat_id: cli.chat_id }, { $inc: { attraction: 1 } }, { returnNewDocument: true, useFindAndModify: false })
        const likesMsg = await ctx.db.Profile.findOne({ chat_id: cli.chat_id })

        if (likesMsg.likes % 3 == false) {
            try {
                await ctx.telegram.sendMessage(cli.chat_id, `${ctx.i18n.t('likely.alert1')} <b>${likesMsg.likes} ${ctx.i18n.t('likely.alert2')}</b>\n\n${ctx.i18n.t('likely.alert3')}`, params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton(ctx.i18n.t('likely.alertbtn'), 'rndmsht')
                    ])
                ))
            } catch (err) {
                if (err.response && err.response.error_code === 403) {
                    await params.userDeleting(ctx, cli.chat_id)
                }
                console.log(err.message)
            }
        }
    }


    return actionMain
}




module.exports = scene