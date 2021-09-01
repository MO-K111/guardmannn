const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')  
let kanal = message.mentions.channels.first();
if(!args[0]) return message.reply("Doğru Kullanım: `!yt-bot-koruma aç/kapat #logkanal`")
if(args[0] === "aç"){
if(!kanal) return message.reply("Log kanalını etiketlemelisin.")
if(db.has(`ytbotkoruma_${message.guild.id}`)) return message.reply("Yönetici Bot koruma sistemi zaten aktif!")
db.set(`ytbotkoruma_${message.guild.id}` , kanal.id)
message.reply("Yönetici Bot koruma başarıyla ayarlandı!")
}
if(args[0] === "kapat"){
if(!db.has(`ytbotkoruma_${message.guild.id}`)) return message.reply("Yönetici Bot koruma sistemi zaten aktif değil!")
db.delete(`ytbotkoruma_${message.guild.id}`)
message.reply("Yönetici Bot koruma başarıyla Kapatıldı!")
   } 

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yt-bot-koruma',
  description: 'YT Bot Koruma Sistemi.',
  usage: 'yaz'

};