let fs = require('fs')
let chalk = require('chalk')

module.exports = async function wel(melcanz, json) {
let welcome = JSON.parse(fs.readFileSync('./database/chat/welcome.json').toString())
let left = JSON.parse(fs.readFileSync('./database/chat/left.json').toString())
let detect = JSON.parse(fs.readFileSync('./database/chat/detect.json').toString())
meta = await melcanz.groupMetadata(json.jid)
function toformat(text, participant) {
return text.replace(/@user/, `@${participant.split('@')[0]}`).replace(/@subject/, meta.subject)
}
switch(json.action) {
case 'promote': 
if (!detect.includes(json.jid)) return
for (let i of json.participants) {
melcanz.reply(json.jid, toformat(mess.group.promote, i))
}
break
case 'demote': 
if (!detect.includes(json.jid)) return
for (let i of json.participants) {
melcanz.reply(json.jid, toformat(mess.group.demote, i))
}
break
case 'add': 
if (!welcome.includes(json.jid)) return
if (json.participants.includes(melcanz.user.jid)) return melcanz.reply(json.jid, `Hai,, Saya adalah *${melcanz.user.name}*\n\nKetik ${prefix}menu untuk menampilkan menu`)
for (let i of json.participants) {
getpp = await melcanz.getProfilePicture(i).catch(e => 'https://storage.caliph71.xyz/img/404.jpg')
gcicon = await melcanz.getProfilePicture(json.jid).catch(e => 'https://storage.caliph71.xyz/img/404.jpg')
caption = toformat(mess.group.welcome, i)
username = melcanz.getName(i)
var canvas = global.API('mel', '/welcome', { username, groupname: meta.subject, groupicon: gcicon, membercount: meta.participants.length, profile: getpp, background: 'https://storage.caliph71.xyz/img/bg2.jpg' }, 'apikey')
melcanz.sendMessage(json.jid, { url: canvas }, 'imageMessage', { caption, contextInfo: { mentionedJid: melcanz.parseMention(caption)}})
}
break
case 'remove': 
if (!left.includes(json.jid)) return
for (let i of json.participants) {
getpp = await melcanz.getProfilePicture(i).catch(e => 'https://storage.caliph71.xyz/img/404.jpg')
gcicon = await melcanz.getProfilePicture(json.jid).catch(e => 'https://storage.caliph71.xyz/img/404.jpg')
caption = toformat(mess.group.bye, i)
username = melcanz.getName(i)
var canvas = global.API('mel', '/goodbye', { username, groupname: meta.subject, groupicon: gcicon, membercount: meta.participants.length, profile: getpp, background: 'https://storage.caliph71.xyz/img/bg2.jpg' }, 'apikey')
melcanz.sendMessage(json.jid, { url: canvas }, 'imageMessage', { caption, contextInfo: { mentionedJid: melcanz.parseMention(caption)}})
}
break
}
}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update './lib/detect.js'"))
  delete require.cache[file]
  require(file)
})
