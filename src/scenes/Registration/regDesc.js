module.exports = {
    f(params){
        const regDesc = new params.Scene('reg7')
        regDesc.enter((ctx) => ctx.reply(params.assets.desript(), params.Extra.markup((m) =>
            m.inlineKeyboard([
            m.callbackButton('Пропустити', 'skip')
            ])
        )))
        regDesc.on('text', (ctx) => {
            ctx.scene.state.decsript = ctx.message.text
            ctx.scene.enter('reg8', ctx.scene.state)
        })
        regDesc.action('skip', (ctx) => {
            ctx.scene.state.decsript = ''
            ctx.scene.enter('reg8', ctx.scene.state)
        })
        regDesc.on('message', (ctx) => ctx.scene.reenter('reg7'))

        return regDesc
    }
}