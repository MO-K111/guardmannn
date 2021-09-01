const Discord = require('discord.js')
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message, args) {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${client.user.username} `, client.user.avatarURL())
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, ${ayarlar.yöneticimesaj}`)
.setColor(ayarlar.color)) 
                                                                              
let kanal = message.mentions.channels.first();

if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${client.user.username} `, client.user.avatarURL())
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Doğru Kullanım:** \`${ayarlar.prefix}ban-koruma ayarla/sıfırla #logkanal\``)
.setColor(ayarlar.color))

if(args[0] != "sıfırla" && !kanal) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${client.user.username} `, client.user.avatarURL())
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Doğru Kullanım:** \`${ayarlar.prefix}ban-koruma ayarla/sıfırla #logkanal\``)
.setColor(ayarlar.color))

if(args[0] === "ayarla"){
if(db.has(`bankoruma_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Ban koruma sistemi zaten aktif!** \n\n➥ **Sıfırlamak için:** \`${ayarlar.prefix}ban-koruma sıfırla\``)
.setColor(ayarlar.color)) 

db.set(`bankoruma_${message.guild.id}`, kanal.id)

const embed = new Discord.MessageEmbed()

.setColor(ayarlar.color)
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Ban koruma başarıyla ayarlandı!** \n\n➥ **Ayarlanan kanal:** ${kanal}`)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())

message.channel.send(embed)
}

if(args[0] === "sıfırla"){
if(!db.has(`bankoruma_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Ban koruma sistemi zaten aktif değil!** \n\n➥ **Ayarlamak için:** \`${ayarlar.prefix}ban-koruma ayarla #logkanal\``)
.setColor(ayarlar.color))

db.delete(`bankoruma_${message.guild.id}`)

const embed = new Discord.MessageEmbed()

.setColor(ayarlar.color)
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setDescription(`<@${message.author.id}>, **Ban koruma başarıyla kapatıldı!** \n\n➥ **Yeniden ayarlamak için:** \`${ayarlar.prefix}ban-koruma ayarla #logkanal\``)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())

message.channel.send(embed)
}

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban-koruma',
  description: 'Ban koruma sistemi.',
  usage: 'ban-koruma'
};