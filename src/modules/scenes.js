module.exports = {
    f(params) {
        const session = require('telegraf/session')
        const Stage = require('telegraf/stage')
        params.Scene = require('telegraf/scenes/base')
        params.Extra = require('telegraf/extra')
        const { enter, leave } = Stage

        // Registration
        const regWelcMsg = require('../scenes/Registration/regWelcMsg').f(params)
        const regAge = require('../scenes/Registration/regAge').f(params)
        const regGender = require('../scenes/Registration/regGender').f(params)
        const regIntr = require('../scenes/Registration/regIntr').f(params)
        const regCity = require('../scenes/Registration/regCity').f(params)
        const regName = require('../scenes/Registration/regName').f(params)
        const regDesc = require('../scenes/Registration/regDesc').f(params)
        const regAvatar = require('../scenes/Registration/regAvatar').f(params)
        const regConf = require('../scenes/Registration/regConf').f(params)

        const stage = new Stage([
            regWelcMsg,
            regAge,
            regGender,
            regIntr,
            regCity,
            regName,
            regDesc,
            regAvatar,
            regConf,
        ], { ttl: 120 })

        params.bot.use(session())
        params.bot.use(stage.middleware())
        params.bot.catch(e => console.log(e))
    }
}