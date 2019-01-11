const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const express = require('express')
const expressApp = express()
const config = require('./config.json')
const debug = require('debug')('telegram:app.js')
const axios = require('axios')

const bot = new Telegraf(config.telegram.token)

const tgctx = new Telegram(config.telegram.token, {
  agent: null,
  webhookReply: true
})

expressApp.use(bot.webhookCallback('/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad'))
bot.telegram.setWebhook('https://jdj.astrianzheng.cn/kcmQPBWcBoyLNwdmQPMeXHgqekTqqzad')

expressApp.get('/', (req, res) => {
  res.send('What are you doing?')
})

bot.command('toggle', (ctx) => {
  if (ctx.message.from.id !== config.telegram.myid) return

  axios.post(`https://maker.ifttt.com/trigger/${config.ifttt.commands.toggle}/with/key/${config.ifttt.token}`, {})
  .then((response) => {
    debug(ctx.message.message_id)
    tgctx.sendMessage(ctx.message.from.id, '操作完成。', {reply_to_message_id: ctx.message.message_id})
  })
  .catch((error) => {
    tgctx.sendMessage(ctx.message.from.id, `出现错误：${error}`, {reply_to_message_id: ctx.message.message_id})
  })
})

bot.command('brightness', (ctx) => {
  if (ctx.message.from.id !== config.telegram.myid) return
  let msg = ctx.message
  if (!msg.text.slice(12)){
    tgctx.sendMessage(msg.from.id, '请在 /brightness 指令之后，加上 1~100 的亮度目标值。', {reply_to_message_id: msg.message_id})
    return
  }
  if (msg.text.slice(12) < 1 || msg.text.slice(12) > 100 || isNaN(parseInt(msg.text.slice(12)))) {
    debug(msg.text.slice(12), msg.text.slice(12) < 1, msg.text.slice(12) > 100)
    tgctx.sendMessage(msg.from.id, `目标亮度不在 1~100 的范围内。`, {reply_to_message_id: msg.message_id})
    return
  }
  axios.post(`https://maker.ifttt.com/trigger/${config.ifttt.commands.brightness}/with/key/${config.ifttt.token}`, {
    value1: msg.text.slice(12)
  })
  .then((response) => {
    debug(ctx.message.message_id)
    tgctx.sendMessage(ctx.message.from.id, '操作完成。', {reply_to_message_id: ctx.message.message_id})
  })
  .catch((error) => {
    tgctx.sendMessage(ctx.message.from.id, `出现错误：${error}`, {reply_to_message_id: ctx.message.message_id})
  })
})

expressApp.listen(3721, () => {
  debug('Example app listening on port 3721!')
})
