const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json')

exports.run = function(client, message, args) {
 
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')  

if(!args[0]) return message.reply("Doğru Kullanım: `!bot-koruma aç/kapat #logkanal`")
if(args[0] === "aç"){
let kanal = message.mentions.channels.first();
if(db.has(`botkoruma_${message.guild.id}`)) return message.reply("Bot koruma sistemi zaten aktif!")
if(!kanal) return message.reply("Log kanalını etiketlemelisin!")
db.set(`botkoruma_${message.guild.id}` , kanal.id)
message.reply("Bot koruma başarıyla ayarlandı!")
}
if(args[0] === "kapat"){
if(!db.has(`botkoruma_${message.guild.id}`)) return message.reply("Bot koruma sistemi zaten aktif değil!")
db.delete(`botkoruma_${message.guild.id}`)
message.reply("Bot koruma başarıyla Kapatıldı!")

}

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bot-koruma',
  description: 'Bot Koruma Sistemi.',
  usage: 'yaz'

};