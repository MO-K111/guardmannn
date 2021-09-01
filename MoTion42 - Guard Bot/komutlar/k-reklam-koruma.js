const db = require("croxydb");
const Discord = require("discord.js");
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
.addField(":x: Hatalı Kullanım!",`Örnek Kullanım **${ayarlar.prefix}reklam-koruma aç #logkanal / kapat**`)
.setColor(ayarlar.color)
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
  message.channel.send(MoTion42);
    return;
  }
  let kufur = await db.fetch(`kufur_${message.guild.id}`);
  if (args[0] == "aç") {
    if (kufur) {
      const MoTion42 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
  .addField("Hata!",`Reklam Koruma Sistemi Zaten Açık.`)
.setColor(ayarlar.color)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
      message.channel.send(MoTion42);
      return;
    } else {
      let kanal = message.mentions.channels.first();
      db.set(`kufur_${message.guild.id}`, kanal.id);
      const MoTion42 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL()) 
 .addField("İşlem Başarılı!",`Reklam Koruma Sistemi Başarılı Bir Şekilde Açıldı.`)
.setColor(ayarlar.color)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
      message.channel.send(MoTion42);
    }
  } else if (args[0] == "kapat") {
    db.delete(`kufur_${message.guild.id}`);
    const MoTion42 = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
  .addField("İşlem Başarılı!",`Reklam Koruma Sistemi Başarılı Bir Şekilde Kapatıldı.`)
.setColor(ayarlar.color)
  .setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
    message.channel.send(MoTion42);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "reklam-koruma",
  description: "Reklam Engel Sistemi, Linklerini Engeller",
  usage: "reklam-engel"
};
