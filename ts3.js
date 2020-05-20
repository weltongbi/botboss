'use strict';
const { TeamSpeak } = require('ts3-nodejs-library');

// import dos boots
const lion = require('./lion');

const epicBoss = require('./func/epicBoss');
const raidBoss = require('./func/raidBoss');

//id do servidor
const idServer = process.env.BOT_ID_SERVER || 1;
//canal que o bot ira atualizar os boss
const epicBossChannel = process.env.BOT_TS3_BIGBOSSCHANNEL || 26;
const raidBossChannel = process.env.BOT_TS3_MIDBOSSCHANNEL || 27;
const bigRaidBossChannel = process.env.BOT_TS3_BIGBOSSCHANNEL || 33;
const tempo = process.env.BOT_TS3_TEMPO || 30000

// Create a new bot with desired configuration (these are the default values)
const ts3 = new TeamSpeak({
	host: process.env.BOT_TS3_HOST || '177.44.128.98',
	queryport: process.env.BOT_TS3_QUERYPORT || 30011,
	username: process.env.BOT_TS3_USERNAME || 'botLion',
	password: process.env.BOT_TS3_PASSWORD || 'qidmlgoubt77',
	keepAlive: true,
});

let interval;

ts3.on("ready", async () => {
	Promise.all([
		ts3.useBySid(idServer, 'bot'),
		ts3.registerEvent("server"),
		ts3.registerEvent("channel", 0),
		ts3.registerEvent("textserver"),
		ts3.registerEvent("textchannel"),
		ts3.registerEvent("textprivate")
	]).then(() => console.log('AllEventos loadings'))
		.catch(e => console.log('CATCHED', e.message));

	ts3.on('textmessage', async ret => {
		if (ret.msg === '!boss') {
			ts3.sendTextMessage(1, 3, 'Aguarde estou processando a lista de boss!');

			const boss = await new lion();

			Promise.all([
				ts3.channelEdit(epicBossChannel, {
					channel_description: await new epicBoss(boss)
				}),
				ts3.sendTextMessage(1, 3, 'Epic Boss atualizado!'),

				ts3.channelEdit(raidBossChannel, {
					channel_description: await new raidBoss(boss, 0)
				}),
				ts3.sendTextMessage(1, 3, 'Raid Boss atualizado!'),

				ts3.channelEdit(bigRaidBossChannel, {
					channel_description: await new raidBoss(boss, 1)
				}),
				ts3.sendTextMessage(1, 3, 'Raid Boss atualizado!'),
			]);


		}
		if (ret.msg === '!automatic') {
			ts3.sendTextMessage(1, 3, "Lista de boss enviada a cada " + (tempo / 1000) + "s!");

			interval = setInterval(async () => {
				const boss = await new lion();

				Promise.all([
					ts3.channelEdit(epicBossChannel, {
						channel_description: await new epicBoss(boss)
					}),
					ts3.channelEdit(raidBossChannel, {
						channel_description: await new raidBoss(boss, 0)
					}),
					ts3.channelEdit(bigRaidBossChannel, {
						channel_description: await new raidBoss(boss, 1)
					}),
				]);
			}, tempo);
		}
	});

});

ts3.on("error", erro => {
	clearInterval(interval);
	console.log(erro)
});