const { Telegraf } = require('telegraf')
const config = require('./config')
const scenes = require(`./modules/scenes`)
const login = require(`./modules/login`)
const assets = require(`./modules/assets`)

const bot = new Telegraf(config.TOKEN)
config.startmsg()

let params = { bot, login, assets, config }

scenes.f(params)
bot.on('message', (ctx) => ctx.scene.enter('reg1'))
    // bot.on('callback_query', (ctx) => login.f(params, ctx))
bot.launch()