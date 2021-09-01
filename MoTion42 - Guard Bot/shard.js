const { ShardingManager } = require('discord.js');
let ayarlar = require("../ayarlar.json")

const bumbe = new ShardingManager('./main.js', { 
	totalShards: 2, 
    token: ayarlar.token 
});
bumbe.spawn();

bumbe.on('shardCreate', shard => {
    console.log(`${shard.id} İDli shard başlatıldı!`);
});