const dc = require("discord.js")
const db = require("croxydb")
let ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {

  let emojik = await db.get(`emojik_${message.guild.id}`)
  let kufur = await db.get(`kufur_${message.guild.id}`)
  let kanalk = await db.get(`kanalk_${message.guild.id}`)
  let capslock = await db.get(`capslock_${message.guild.id}`)
  let hereengel = await db.get(`hereengel_${message.guild.id}`)
  let botkoruma = await db.get(`botkoruma_${message.guild.id}`)
  let banlimit = await db.get(`banlimit_${message.guild.id}`)
  let ytbotkoruma = await db.get(`ytbotkoruma_${message.guild.id}`)
  let bankoruma = await db.get(`bankoruma_${message.guild.id}`)
  let rolkoruma = await db.get(`rollogk_${message.guild.id}`)

  let botkoruma_k;
  if(!botkoruma) {
    botkoruma_k = "❌"
  } else {
    botkoruma_k = `✅`
  }

  let hereengel_k;
  if(!hereengel) {
    hereengel_k = "❌"
  } else {
    hereengel_k = `✅`
  }

  let capslockk;
  if(!capslock) {
    capslock = "❌"
  } else {
    capslock = `✅`
  }

  let emoji_k;
  if(!emojik) {
    emoji_k = "❌"
  } else {
    emoji_k = `✅`
  }

  let kanalkk;
  if(!kanalk) {
    kanalkk = "❌"
  } else {
    kanalkk = `✅`
  }
  
  let reklam_k;
  if(!kufur) {
    reklam_k = "❌"
  } else {
    reklam_k = `✅`
  }
  
  let bankoruma_k;
  if(!bankoruma) {
    bankoruma_k = "❌"
  } else {
    bankoruma_k = `✅`
  }
  
  let ytbotkoruma_k;
  if(!ytbotkoruma) {
    ytbotkoruma_k = "❌"
  } else {
    ytbotkoruma_k = `✅`
  }
  
  let banlimit_k;
  if(!banlimit) {
    banlimit_k = "❌"
  } else {
    banlimit_k = `✅`
  }
  
  let rolkoruma_k;
  if(!rolkoruma) {
    rolkoruma_k = "❌"
  } else {
    rolkoruma_k = `✅`
  }
  
  
  
  if(!args[0]) {
    let MoTion42 = new dc.MessageEmbed()
    .setDescription(`
\`1)\` **!kontrol \`koruma\`**
`)
    .setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())  
  .setFooter(ayarlar.footer, client.user.avatarURL())
    .setTimestamp()

    message.channel.send(MoTion42)
  } else if(args[0] === "koruma") {
    let moderasyon = new dc.MessageEmbed()
     .addField("➥ Emoji Koruma", `> ${emoji_k}`, true)
     .addField("➥ Reklam Koruma", `> ${reklam_k}`, true)
     .addField("➥ Kanal Koruma", `> ${kanalkk}`, true)
     .addField("➥ Etiket Koruma", `> ${hereengel_k}`, true)
     .addField("➥ CapsLock Koruma", `> ${capslock}`, true)
     .addField("➥ Bot Koruma", `> ${botkoruma_k}`, true)
    .addField("➥ Yönetici Bot Koruma", `> ${ytbotkoruma_k}`, true)
    .addField("➥ Ban Limit", `> ${banlimit_k}`, true)
    .addField("➥ Ban Koruma", `> ${bankoruma_k}`, true)
    .addField("➥ Rol Koruma", `> ${rolkoruma_k}`, true)
    .setColor(ayarlar.color)
    
.setAuthor(`${client.user.username} `, client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
     .setFooter(ayarlar.footer, client.user.avatarURL())
     .setTimestamp()
       
 message.channel.send(moderasyon);
  }

};
exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: [],
 permLevel: 0
};
exports.help = {
  name: "kontrol"
};