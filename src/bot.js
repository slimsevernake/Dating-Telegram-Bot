const { Telegraf } = require('telegraf')
const config = require('./config')

const bot = new Telegraf(config.TOKEN)

bot.launch()