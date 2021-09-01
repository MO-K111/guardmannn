const Discord = require('discord.js')
const db = require('croxydb')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
  if (!args[0]) {
const MoTion42 = new Discord.MessageEmbed() 
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
.setDescription(`**Doğru Kullanım:** ${ayarlar.prefix}emoji-koruma aç/kapat #log`)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
message.channel.send(MoTion42) 
 }
  if (args[0] === 'aç') {
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.reply("Emoji koruma log kanalını etiketlemelisin.")
    db.set(`emojik_${message.guild.id}`, kanal.id)
     message.reply(`Emoji Koruma Başarıyla Açıldı!`)
  }
   if (args[0] === 'kapat') {
    db.delete(`emojik_${message.guild.id}`)
    message.reply(`Emoji Koruma Başarıyla Kapatıldı!`)
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'emoji-koruma'
}; 
