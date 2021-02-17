module.exports = {
    f(params){
        const regName = new params.Scene('reg6')

        regName.enter((ctx) => {
            ctx.reply(params.assets.namequest() , params.Extra.markup((m) =>
                m.inlineKeyboard([
                m.callbackButton(`Мене звати ${ctx.from.first_name}`, 'first_name')
                ])
            ))
        })
        regName.action('first_name', (ctx) => {
            ctx.scene.state.name = ctx.from.first_name
            ctx.scene.enter('reg7', ctx.scene.state)
        })
        regName.on('text', (ctx) => {
            ctx.scene.state.name = ctx.message.text
            ctx.scene.enter('reg7', ctx.scene.state)
        })
        regName.on('message', (ctx) => {
            ctx.scene.reenter('reg6')
        })
        
        

        return regName
    }
}