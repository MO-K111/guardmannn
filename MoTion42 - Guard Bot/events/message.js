const ayarlar = require('../ayarlar.json');
const db = require("croxydb");
const Discord = require("discord.js")
let talkedRecently = new Set();

module.exports = message => {

  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {

      if (!message.guild) {
if(!ayarlar.sahip) {
message.channel.send(`[<@${message.author.id}>]`)  
  const ozelmesajuyari = new Discord.MessageEmbed()
.setColor(ayarlar.color)
  .setTimestamp()
  .setFooter(ayarlar.footer, client.user.avatarURL())
  .setDescription(`➥ **Botun komutlarını özel mesajlarda kullanamazsın.** \n\n➥ **Komutları kullanmak için botun bir sunucuda bulunması gerek.** \n\n➥ **Komutlara göz atmak için:** \`${ayarlar.prefix}yardım\``)
  return message.author.send(ozelmesajuyari); }
      }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};