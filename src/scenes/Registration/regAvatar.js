module.exports = {
    f(params){
        const regAvatar = new params.Scene('reg8')

        regAvatar.enter((ctx) => ctx.reply(params.assets.avatarmsg()))
        regAvatar.on('photo', (ctx) => {
            ctx.scene.state.avatar = ctx.message.photo[0].file_id
            ctx.scene.enter('reg9', ctx.scene.state)
        })
        regAvatar.on('video', (ctx) => {
            ctx.scene.state.avatar = ctx.message.video.file_id
            ctx.scene.enter('reg9', ctx.scene.state)
        })
        regAvatar.on('message', (ctx) => {
            ctx.reply(params.assets.avatarmsg())
        })

        return regAvatar
    }
}