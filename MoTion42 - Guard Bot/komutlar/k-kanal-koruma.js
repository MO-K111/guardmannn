const Discord = require('discord.js')
const db = require('croxydb')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {

 if (!message.member.hasPermission("ADMINISTRATOR")) {
    const MoTion42 = new Discord.MessageEmbed()
     .setDescription(`**Ne Yazık Ki, Bu Komutu Kullanmaya Yetkin Yok.**`)
.setColor(ayarlar.color)
.setAuthor(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
    message.channel.send(MoTion42);
    return;
  }
let prefix = ayarlar.prefix
  
  
  if (!args[0]) {
    const MoTion42 = new Discord.MessageEmbed()
    .setDescription(`**Doğru kullanım:** ${ayarlar.prefix}kanal-koruma aç/kapat #logkanal`)
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
  return message.channel.send(MoTion42)
  }
  if (args[0] === 'aç') {
    let kanal = message.mentions.channels.first()
    if(!kanal) return message.reply("Log kanalını etiketlemelisin.")
    db.set(`kanalk_${message.guild.id}`, kanal.id)
       const MoTion42 = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
    .setDescription(`**Kanal Koruma Başarıyla Açıldı!**`)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
   return message.channel.send(MoTion42)
  }
   if (args[0] === 'kapat') {
    
    db.delete(`kanalk_${message.guild.id}`)
       const MoTion42 = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
    .setDescription(`**Kanal Koruma Başarıyla Kapatıldı!**`)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
    return message.channel.send(MoTion42)
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kanal-koruma'
}; 
