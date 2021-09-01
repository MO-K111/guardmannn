const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message, args) {

 if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')  
let izinlibotlar = db.get(`izinlibotlar_${message.guild.id}`) || ["bot","yok"]
let botid = args[1] 
if(!args[0]) return message.reply("Doğru Kullanım: `!bot-izin ver <id> / al <id>`")
if(!botid) return message.reply("İzin vereceğiniz/İznini alacağınız botun ID'sini girmelisin.")
if(args[0] === "ver"){
if(izinlibotlar.some(a => a == botid)) return message.reply("Bu bot zaten izinli.")
db.push(`izinlibotlar_${message.guild.id}` , botid)
message.reply("Bu bota başarıyla izin verildi!")
}
if(args[0] === "al"){
if(izinlibotlar.some(a => a != botid)) return message.reply("Bu bot zaten izinli değil.")
db.unpush(`izinlibotlar_${message.guild.id}`, botid)
message.reply("Bu botun izni başarıyla alındı!")

}

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bot-izin',
  description: 'Bot Koruma Sistemi.',
  usage: 'bot-izin'

};