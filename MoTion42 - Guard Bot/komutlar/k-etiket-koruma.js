const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { 

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const MoTion42 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
     .setDescription(`Ne Yazık Ki Bu Komutu Kullanmaya Yetkin Yok.`)
.setColor(ayarlar.color)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
    message.channel.send(MoTion42);
    return;
  } 
 if (!args[0]) {  
  const MoTion42 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
  .setDescription(`Örnek Kullanım: **${prefix}etiket-koruma aç/kapat**`)
.setThumbnail(client.user.avatarURL())
.setColor(ayarlar.color)
.setFooter(ayarlar.footer, client.user.avatarURL())	
  return message.channel.send(MoTion42) 
  }
  if (args[0] == 'aç') {  
  db.set(`hereengel_${message.guild.id}`, 'Aktif')
  const MoTion42 = new Discord.MessageEmbed() 
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
 .setDescription(`Everyone Here Engel Başarılı Şekilde Aktif Edildi!`)
.setColor(ayarlar.color)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
  return message.channel.send(MoTion42)
  }
  if (args[0] == 'kapat') {
  db.delete(`hereengel_${message.guild.id}`, 'kapali')
  const MoTion42 = new Discord.MessageEmbed() 
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
 .setDescription(`Everyone Here Engel Başarılı Şekilde Kapatıldı!`)
.setColor(ayarlar.color)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
  return message.channel.send(MoTion42)
  } 
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'etiket-koruma',
  description: '@everyone ve @here Etiketlerini Engeller',
  usage: 'etiket-engel'
};
