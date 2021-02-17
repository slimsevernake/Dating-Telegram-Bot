module.exports = {
    f(params){
        const regAge = new params.Scene('reg2')

        regAge.enter((ctx) => ctx.reply(params.assets.agequestion()))
        regAge.on('text', (ctx) => {
            if(isNaN(parseInt(ctx.message.text))){ 
                ctx.reply(params.assets.agevalidate()) 
            } else {
                ctx.scene.enter(`reg3`, { age: ctx.message.text })
            }
        })

        return regAge
    }
}