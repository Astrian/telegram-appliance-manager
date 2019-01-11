const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()
const config = require('./config.json')
const debug = require('debug')('telegram:app.js')
const axios = require('axios')

const bot = new Telegraf(config.telegram.token)

expressApp.use(bot.webhookCallback('/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad'))
bot.telegram.setWebhook('https://jdj.astrianzheng.cn/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad')

expressApp.get('/', (req, res) => {
  res.send('What are you doing?')
})

bot.command('toggle', (ctx) => {
  debug(config.ifttt)
  axios.post(`https://maker.ifttt.com/trigger/${config.ifttt.commands.toggle}/with/key/${config.ifttt.token}`, {})
  .then((response) => {
    debug(ctx.message.from.id)
    // ctx.reply('操作完成。')
  })
  .catch((error) => {
    ctx.reply(`出现错误：${error}`)
  })
})

expressApp.listen(3721, () => {
  debug('Example app listening on port 3721!')
})
