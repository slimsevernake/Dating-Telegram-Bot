module.exports = {
    f(bot) {
        const session = require('telegraf/session')
        const Stage = require('telegraf/stage')
        const Scene = require('telegraf/scenes/base')
        const Extra = require('telegraf/extra')
        const { enter, leave } = Stage
        const params = { Scene, Extra }

        // Registration scenes
        const regWelcMsg = require('../scenes/Registration/regWelcMsg').f(params)
        const regAge = require('../scenes/Registration/regAge').f(params)
        const regGender = require('../scenes/Registration/regGender').f(params)
        const regIntr = require('../scenes/Registration/regIntr').f(params)
        const regCity = require('../scenes/Registration/regCity').f(params)
        const regName = require('../scenes/Registration/regName').f(params)
        const regDesc = require('../scenes/Registration/regDesc').f(params)
        const regAvatar = require('../scenes/Registration/regAvatar').f(params)
        const regConf = require('../scenes/Registration/regConf').f(params)

        // Profile scenes
        const profileMenu = require('../scenes/Profile/profileMenu').f(params)
        const profileAvatar = require('../scenes/Profile/profileAvatar').f(params)
        const profileDescript = require('../scenes/Profile/profileDescript').f(params)

        // Action scenes
        const actionMain = require('../scenes/Action/actionMain').f(params)
        const actionMenu = require('../scenes/Action/actionMenu').f(params)
        const actionMail = require('../scenes/Action/actionMail').f(params)

        // Action scenes
        const likelyMain = require('../scenes/Likely/likelyMain').f(params)

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
            profileMenu,
            profileAvatar,
            profileDescript,
            actionMain,
            actionMenu,
            actionMail,
            likelyMain
        ], { ttl: 120 })

        bot.use(session())
        bot.use(stage.middleware())
    }
}