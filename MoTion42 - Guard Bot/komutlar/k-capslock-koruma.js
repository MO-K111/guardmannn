const Discord = require('discord.js');
const db = require('croxydb')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')   

if (!args[0]) {  
message.reply(`**Doğru Kullanım:** ${ayarlar.prefix}capslock-koruma aç/kapat`) 
}

if (args[0] === 'kapat') {  
db.delete(`capslock_${message.guild.id}`, 'kapali')
message.reply(`Capslock engelleme sistemi, kapatıldı!`)
  }
  
if (args[0] === 'aç') { 
db.set(`capslock_${message.guild.id}`, 'acik')
message.reply(`Capslock engelleme sistemi, aktif!`)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'capslock-koruma',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-koruma'
};

































































