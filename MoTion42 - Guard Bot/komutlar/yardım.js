const Discord = require("discord.js");
let ayarlar = require("../ayarlar.json")
const db = require('croxydb');


exports.run = async (client, message, args) => {

  if(!args[0]) {
let motion42 = new Discord.MessageEmbed()

.setThumbnail(client.user.avatarURL())
.setColor(ayarlar.color)
.setDescription(`
:white_check_mark: **Koruma Komutları**
\`\`\`
${ayarlar.prefix}emoji-koruma - Silinen emojiyi geri açar.
${ayarlar.prefix}kanal-koruma - Silinen kanalı geri açar. 
${ayarlar.prefix}reklam-koruma - Sunucuda reklamları siler.
${ayarlar.prefix}etiket-koruma - Everyone here atanı engeller.
${ayarlar.prefix}capslock-koruma - Büyük harfleri engeller.
${ayarlar.prefix}bot-koruma - Sunucuya eklenen botları banlar.
${ayarlar.prefix}banlimit-koruma - Ban limit ayarlarsınız.
${ayarlar.prefix}ban-koruma - Üye banlarsa banlanır.
${ayarlar.prefix}yt-bot-koruma - Yönetici perm botları banlar.
${ayarlar.prefix}rol-koruma - Rol koruma sistemini ayarlarsınız.
\`\`\`

> :floppy_disk: **Bilgilendirme**
➥ \`${ayarlar.prefix}yardım\` yazarak tüm komutlara erişe bilirsiniz.
➥ \`${ayarlar.prefix}kontrol\` yazarak komutların durumuna bakarsınız.
➥ Bu komutlar sahesinde sunucunuzu koruya bilirsiniz!
`)
.setTimestamp()
.setFooter(ayarlar.footer, client.user.avatarURL())	
  
message.channel.send(motion42);
  }
  };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
  }

exports.help = {
    name: "yardım",
    description: "Yardım List.",
    usage: "yardım"
}