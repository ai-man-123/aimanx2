require('./config')
let awesome = require('awesome-phonenumber')
let {
MessageType,
WAConnection,
Browsers
} = require('@adiwajshing/baileys')
let { color, bgcolor } = require('./lib/color')
const cp = require('child_process')
const simple = require('./lib/simple.js')
const WAPI = simple.WAConnection(WAConnection)
const fetch = require('./lib/fetcher')
let fs = require('fs')
let os = require('os')
let figlet = require('figlet')
global.authfile = './session.json'
async function mulai() {
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
let melcanz = new WAPI()
melcanz.browserDescription = Browsers.appropriate('Desktop')
melcanz.browserDescription[0] = "Bot WhatsApp By @Melcanz.io"
var { currentVersion } = await fetch.json(`https://web.whatsapp.com/check-update?version=1&platform=web`)
melcanz.version = currentVersion.split('.').map(a => parseInt(a)) || [2, 2142, 12]
melcanz.logger.level = 'warn'
console.log(color(figlet.textSync('Base Wabot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
console.log(color('[ CREATED BY Melcanz ]'))
melcanz.on('qr', async () => {
console.log('Scan kode qr ini untuk menjalankan bot')
})
fs.existsSync(authfile) && melcanz.loadAuthInfo(authfile)
	melcanz.on('connecting', () => {
		console.log(color('[CLIENT]', 'cyan'), color('Connecting...', 'yellow'))
	})
	melcanz.on('close', async ({ reason, isReconnecting }) => {
	console.log(color('[CLIENT]', 'cyan'), color(`Because ${reason} reconnecting : ${isReconnecting}`, 'yellow'))
	if (!isReconnecting && reason == 'invalid_session') {
           console.log(color('[CLIENT]', 'cyan'), color('Sesion Invalid, deleting session', 'rex'))
            if (fs.existsSync(authfile)) {
                fs.unlinkSync(authfile)
            }
            melcanz.clearAuthInfo()
	    mulai()
        }
	})
	melcanz.on('open', (ye) => {
		console.log(color('[CLIENT]', 'cyan'), color('Connected...', 'green'))
	})
	await melcanz.connect().then(async v => { 
        console.log(color(`[CLIENT]`, 'cyan'), color('WhatsApp Web Running On Version :'), color(melcanz.version.join('.'), 'yellow'))
        global.server ? require('./server')(melcanz) : ''
	// console.log(`Nama Bot : ${melcanz.user.name}\nID Bot : ${awesome('+'+melcanz.user.jid.split('@')[0]).getNumber('international')}\nMode : ${selfmode ? 'Self Mode' : 'Public Mode'}\nHostname : ${os.hostname()}`)
		if (!fs.existsSync(authfile)) fs.writeFileSync(authfile, JSON.stringify(melcanz.base64EncodedAuthInfo(), null, '\t'))
	owner.map(a => melcanz.reply(a + "@c.us", 'Bot Started.....'))
		})
    melcanz.on('CB:action,,call', id => {
    require('./message/call')(melcanz, id)
    })
    melcanz.on('group-participants-update', async (anu) => {
	console.log(anu)
	require('./message/detect')(melcanz, anu)
	})
	melcanz.on('CB:action,,battery', json => {
      melcanz.battery = Object.fromEntries(Object.entries(json[2][0][1]).map(v => [v[0], eval(v[1])]))
      console.log(color(`[CLIENT]`, 'cyan'), color('Battery Updated!', 'yellow'))
      console.log(melcanz.battery)
      })
      melcanz.on('message-delete', async (m) => {
      require('./message/antidelete')(melcanz, m)
    })
    melcanz.on('chat-update', async chatUpdate => {
    try {
     if (!chatUpdate.hasNewMessage) return   
     if (!chatUpdate.messages && !chatUpdate.count) return
    
 let msg = chatUpdate.messages.all()[0]
	 if (!msg.message) return
     msg.message = msg.message.hasOwnProperty('ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
       simple.smsg(melcanz, msg)
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return 
	if (!msg.key.fromMe && selfmode) return
	if (msg.key.id.startsWith('XYZ0')) return
	if (autoread) await melcanz.chatRead(msg.chat).catch(() => {})
    require('./message/melcanz')(melcanz, msg)
    } catch (e) {
    console.log(color('[ERR]', 'cyan'), color(e, 'red'))
    }
    })
    }
    async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)
  }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color("Update './index.js'", 'red'))
  delete require.cache[file]
  require(file)
})

mulai()
_quickTest()
