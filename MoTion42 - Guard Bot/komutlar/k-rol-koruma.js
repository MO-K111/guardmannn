const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

	if (!message.guild) return;
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Ne Yazık Ki Bu Komutu Kullanmaya Yetkin Yok!")

let kanal = message.mentions.channels.first()
if(!args[0]) return message.channel.send("Doğru kullanım: `!rol-koruma aç/kapat #logkanal`")
if(args[0] === "aç"){
if(!kanal) return message.reply("**Doğru kullanım:** `!rol-koruma aç/kapat #logkanal`")
if(db.has(`rollogk_${message.guild.id}`)) return message.reply("Zaten rol koruma sistemi açık!")
db.set(`rollogk_${message.guild.id}`, kanal.id)
message.reply("Başarıyla ayarlandı!")
}
if(args[0] === "kapat"){
if(!db.has(`rollogk_${message.guild.id}`)) return message.reply("Zaten rol koruma sistemi kapalı!")
db.delete(`rollogk_${message.guild.id}`)
message.reply("Başarıyla kapatıldı!")
}



}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'rol-koruma',
    description: 'koruma',
 } 