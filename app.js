const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
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
  if (ctx.message.from.id !== config.telegram.myid) return
  debug(config.ifttt)
  axios.post(`https://maker.ifttt.com/trigger/${config.ifttt.commands.toggle}/with/key/${config.ifttt.token}`, {})
  .then((response) => {
    debug(ctx.message.message_id)
    Telegram.sendMessage(ctx.message.from.id, '操作完成。', {reply_to_message_id: ctx.message.message_id})
    // ctx.reply('操作完成。')
  })
  .catch((error) => {
    ctx.reply(`出现错误：${error}`)
  })
})

expressApp.listen(3721, () => {
  debug('Example app listening on port 3721!')
})
