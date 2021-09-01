require("express")().listen(1343);

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Collection, Client, Util } = require("discord.js");
const fs = require('fs');
const db = require('croxydb');
const http = require('http');
const express = require('express');
const chalk = require('chalk');
require('./util/eventLoader.js')(client);

const app = express();

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------EMOJİ KORUMA-------------------------------//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`)
  if (emojik) {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == emoji.guild.owner.id) return;
  if (!emoji.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
    
  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
  client.channels.cache.get(emojik).send(`\`${emoji.name}\` - İsimli emoji silindi. Koruma sistemi aktif olduğu için yeniden eklendi! \`[EMOJİ KORUMA]\``)
  
}else 
return client.channels.cache.get(emojik).send(`\`${emoji.name}\` - İsimli emoji silindi. Silen kişinin **yönetici yetkisi** olduğunu için emojiyi yeniden oluşturmadım. \`[EMOJİ KORUMA]\``)
}  
});

//---------------------------------OYNUYOR - DURUM---------------------------------\\

client.on('ready', () => {
    let durum = "✨ MoTion42・!yardım"
    client.user.setActivity(`${durum}`, { type: 'WATCHING' })
    const log = console.log
    log(chalk.green(`____________________________________________________`))
    log(chalk.green(`BOT: Aktif`))
    log(chalk.green(`BOT: Komutlar yüklendi.`))
    log(chalk.green(`BOT: ${client.user.tag} adı ile giriş yapıldı !`))
    log(chalk.green(`BOT: Oynuyor ${durum} olarak ayarlandı.`))
    log(chalk.green("`Motion#0202 katkılarıyla..."))
    log(chalk.green(`____________________________________________________`))
    
    })

//----------------------REKLAM-ENGEL-----------------------//

client.on("message", async message => {
if (!message.guild) return;
  let uyarisayisi = await db.get(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
       ;
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === undefined) {
          let uyari = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(ayarlar.footer, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari).then(msg => msg.delete({timeout: 15000}))
           message.delete()
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(ayarlar.footer, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari).then(msg => msg.delete({timeout: 15000}))
           message.delete()
        }
        if (uyarisayisi === 2) {
          
          await kullanici.kick({
            reason: `MoTion42`
          });
          let uyari = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(ayarlar.footer, client.user.avatarURL)
            .setTimestamp();
          client.channels.cache.get(reklamkick).send(uyari)
          message.channel.send(uyari).then(msg => msg.delete({timeout: 15000}))
          message.delete();
        }
        if (uyarisayisi === 3) {
          
          await kullanici.ban({
            reason: `MoTion42 Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setAuthor(`${client.user.username} `, client.user.avatarURL())
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(ayarlar.footer, client.user.avatarURL)
            .setTimestamp();
          client.channels.cache.get(reklamkick).send(uyari)
          message.channel.send(uyari).then(msg => msg.delete({timeout: 15000}))
          message.delete();
        }
      }
    }
});

//---------------------------------KANAL KORUMA-------------------------------//

client.on("channelDelete", async function(channel) {
   let log = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (log) {
    channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(audit => {
     let banlayan = audit.entries.first().executor.id
     const guild = channel.guild.cache;
let channelp = channel.parentID;
    if(channel.guild.members.cache.get(banlayan).hasPermission('ADMINISTRATOR')) return client.channels.cache.get(log).send(`\`${channel.name}\` - İsimli kanal silindi. Silen kişi **Yönetici** yetkisi olduğu için kanalı tekrar açmadım. \`[KANAL KORUMA]\``)
  channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.cache.find(channel => channel.id === channelp),
      client.channels.cache.get(log).send(`\`${channel.name}\` - İsimli kanal silindi. Koruma sistemi aktif olduğu için yeniden oluşturuldu! \`[KANAL KORUMA]\``)

    );
  });
    })
  }
})

//---------------------------------ETİKET KORUMA---------------------------------\\

client.on("message", async msg => {
if (!msg.guild) return;
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "Aktif") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var MoTion42 = new Discord.MessageEmbed()
.setColor(ayarlar.color)
        .setFooter(`MoTion42`, client.user.avatarURL()).setTimestamp()       
   .setDescription(`<@${msg.author.id}>, **Bu Sunucuda Everyone ve Here Atmak Yasak!**`);
      
     msg.channel.send(MoTion42);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//-------------------------------------------CAPSLOCK ENGEL-------------------------------------------//

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engelleniyor!`).then(m => m.delete({timeout: 5000}))
     }
       }
     }
   }
  }
});

//------------------------------------BOT KORUMA-------------------------------//

client.on('guildMemberAdd', async member => {
  let kanal = await db.fetch(`botkoruma_${member.guild.id}`)
  let izinlibotlar = await db.get(`izinlibotlar_${member.guild.id}`) || ["bot","yok"]
if(kanal){
if(member.user.bot){
if(izinlibotlar.some(a => a == member.id)) return client.channels.cache.get(kanal).send(`**${member.user.usermame}** - Adlı bot sunucuya katıldı ama **izinli** olduğu için banlamadım.`)
 member.ban({reason: `Bot koruma sistemi banladı.`}).then(client.channels.cache.get(kanal).send(`**${member.user.username}** - Adlı bot sunucuya katıldı. Bot koruma sistemi aktif olduği için banlandı! \n> **!bot-izni ver id** id yaparak botun sunucuya giriş yapmasını sağlaya bilirsinizş.`))
}else return;
}else return;
})


//------------------------------------BAN LİMİT-------------------------------//

client.on('guildBanAdd', async (guild, user) => {
  if(!db.has(`banlimit_${guild.id}`)) return;
  await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => {
    let banlayan = audit.entries.first().executor.id
    if(banlayan == client.user.id) return;
    db.add(`banlamalar_${banlayan}`, 1)
  let bansayısı = db.fetch(`banlamalar_${banlayan}`)
  let banlimit = db.fetch(`banlimit_${guild.id}`)
  let banlimitlog = db.fetch(`banlimitlog_${guild.id}`)
  if(bansayısı >= banlimit){  
    client.channels.cache.get(banlimitlog).send(`**${banlayan}** - ID'li kişi ${user.id} ID'li kullanıcıyı banladığı için sunucudan yasaklanmıştır`)
    guild.members.cache.get(banlayan).ban({reason: "Ban limiti aştı."}).catch(err => console.log(err))
  }
    })
  
  
})


//------------------------------------YÖNETİCİ BOT KORUMA-------------------------------//

client.on('guildMemberAdd', async member => {
  let kanal = await db.fetch(`ytbotkoruma_${member.guild.id}`)
if(kanal){
if(member.user.bot){
if(!member.hasPermission('ADMINISTRATOR')) return client.channels.cache.get(kanal).send(`${member.user.username} - Adlı bot sunucuya katıldı. Yönetici yetkisi olmadığı için banlanmadı! \`[YÖNETİCİ BOT KORUMA]\``)
member.ban({reason: `Yönetici bot koruma sistemi banladı.`}).then(client.channels.cache.get(kanal).send(`**${member.user.username}** - Adlı bot sunucuya katıldı. Yönetici yetkisi olduğu ve yönetici bot koruma sistemi aktif olduği için banlandı! \`[YÖNETİCİ BOT KORUMA]\``))
}else return;
}else return;
})


//------------------------------------BAN KORUMA-------------------------------//

client.on('guildBanAdd', async (guild, user) => {
  if(!db.has(`bankoruma_${guild.id}`)) return;
   await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => {
    let banlayan = audit.entries.first().executor.id
    
     let bankoruma = db.fetch(`bankoruma_${guild.id}`)
  if(guild.owner.id != banlayan){  
    client.channels.cache.get(bankoruma).send(`**${banlayan}** ID'li bir kullanıcıyı banladığı için banlandı.\`[BAN KORUMA SİSTEMİ]\``)
    guild.members.cache.get(banlayan).ban({reason: "Ban koruma sistemi"}).catch(err => console.log(err))
  }
    })
 
  
})


//------------------------------------ROL KORUMA-------------------------------//

client.on("roleDelete", async role => {
let logkanal = await db.fetch(`rollogk_${role.guild.id}`)
await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(audit => {
    let rolsilen = audit.entries.first().executor.id
    if(role.guild.members.cache.get(rolsilen).hasPermission("ADMINISTRATOR")) return client.channels.cache.get(logkanal).send(` **${role.name}** - Adlı Rol Silindi. Silen kişi yönetici yetkili olduğu için rolü geri oluşturmadım. `);
  if (logkanal) {
    role.guild.roles.create({
      data: {
    name: role.name,
    color: role.color,
    permissions: role.permissions
  },
  reason: 'rol koruma',
    });

    client.channels.cache.get(logkanal).send(
      ` **${role.name}** - Adlı Rol Silindi. Rolü tekrar oluşturdum. \`[ROL KORUMA]\``
    );
  }else return;
})
});

