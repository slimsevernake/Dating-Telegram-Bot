module.exports = {
    f(params) {
        const actionMail = new params.Scene('action_mail')

        actionMail.enter((ctx) => { ctx.replyWithHTML(`${ctx.i18n.t('action.message')} <b>${ctx.scene.state.cli_info.name}</b>`) })
        actionMail.on('text', async(ctx) => {
            await ctx.db.Relation.create({
                host_id: ctx.from.id,
                cli_id: ctx.scene.state.cli_info.chat_id,
                host_like: true,
                cli_checked: false,
                msg_text: ctx.message.text
            })
            await console.log(`User ${ctx.from.first_name} send msg to ${ctx.scene.state.cli_info.name}`)
            await ctx.scene.state.relations.push(ctx.scene.state.cli_info.chat_id)
            ctx.scene.enter('action_main', ctx.scene.state)
        })
        actionMail.on('message', (ctx) => { ctx.replyWithHTML(ctx.i18n.t('action.mail_error')) })

        return actionMail
    }
}