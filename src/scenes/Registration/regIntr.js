module.exports = {
    f(params){
        const regIntr = new params.Scene('reg4')

        regIntr.enter((ctx) => {
            ctx.reply(params.assets.interest() , params.Extra.markup((m) =>
                m.inlineKeyboard([
                m.callbackButton('👦 Хлопці', 'boys'),
                m.callbackButton('👧 Дівчата', 'girls'),
                m.callbackButton('👤 Байдуже', 'both')
                ])
            ))
        })
        regIntr.action('boys', (ctx) => {
            ctx.scene.state.interest = 1
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.action('girls', (ctx) => {
            ctx.scene.state.interest = 0
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.action('both', (ctx) => {
            ctx.scene.state.interest = 2
            ctx.scene.enter('reg5', ctx.scene.state)
        })
        regIntr.on('message', (ctx) => ctx.scene.reenter('reg4'))

        return regIntr
    }
}