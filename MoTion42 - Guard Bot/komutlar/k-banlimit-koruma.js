const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

let limit = args[1]
let kanal = message.mentions.channels.first();
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')  
if(!args[0]) return message.reply("Doğru Kullanım: `!banlimit-koruma ayarla/sıfırla <limit> #logkanal `")
if(args[0] === "ayarla"){
  if(!limit) return message.reply("Ban limit değeri girmelisin.")
  if(isNaN(limit)) return message.reply("Ban limit değeri bir **sayı** olmalıdır.")
  if(!kanal) return message.reply("Log kanalını etiketlemelisin.")
  if(db.has(`banlimit_${message.guild.id}`)) return message.reply("Ban limit sistemi zaten zaten aktif!")
  db.set(`banlimit_${message.guild.id}` , limit)
  db.set(`banlimitlog_${message.guild.id}` , kanal.id)
  message.reply(`Ban limit başarıyla **${limit}** olarak ayarlandı!`)
}
if(args[0] === "sıfırla"){
  if(!db.has(`banlimit_${message.guild.id}`)) return message.reply("Ban limit sistemi zaten aktif değil!")
  db.delete(`banlimit_${message.guild.id}`)
  db.delete(`banlimitlog_${message.guild.id}`)
  message.reply("Banlimit başarıyla Kapatıldı!")
   } 

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'banlimit-koruma',
  description: 'Ban limit.',
  usage: 'banlimit'
};