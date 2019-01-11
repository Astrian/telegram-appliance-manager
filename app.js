const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()
const config = require('./config.json')
const debug = require('debug')('telegram:app.js')

const bot = new Telegraf(config.telegram.token)

expressApp.use(bot.webhookCallback('/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad'))
bot.telegram.setWebhook('https://jdj.astrianzheng.cn/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad')

expressApp.get('/', (req, res) => {
  res.send('What are you doing?')
})

bot.hears('hi', (ctx) => ctx.reply('Hey there'))

expressApp.listen(3721, () => {
  debug('Example app listening on port 3721!')
})
