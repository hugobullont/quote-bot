const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: false});
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const QuotesController = require('./src/QuotesController');
const SoundsController = require('./src/SoundsController');
const StreamsController = require('./src/StreamsController');

let songRequests = [];

require('dotenv').config();

let greetingsChannel = process.env.DISCORD_GREETING_CHANNEL;
let streamHookID = process.env.DISCORD_STREAM_HOOK_ID;
let streamHookToken = process.env.DISCORD_STREAM_HOOK_TOKEN;

let streamsHook = new Discord.WebhookClient(streamHookID, streamHookToken);

//ReadyBot
client.on('ready', () => {
    console.log('Logged in.')
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: '!help',
        }
    });
});

//onMessage
client.on('message', async msg => {
    if(!msg.author.bot){ 
        if (msg.content === 'dimelo' || msg.content === 'dímelo' || msg.content.includes('dimelo') || msg.content.includes('dímelo')) {
            QuotesController.getRandomMessage().then((message)=>{
                msg.channel.send(message);
            });
        }

        if (msg.content.includes('!agregar') && !msg.content.includes('!agregarTwitchStream')) {
            let message = msg.content.substring('!agregar '.length);
            QuotesController.addMessage(message);
            msg.reply('Mensaje Añadido!!!')
        }

        if (msg.content.includes('!agregarTwitchStream')) {
            let username = msg.content.substring('!agregarTwitchStream '.length);
            StreamsController.addStreamer(username);
            msg.reply('Streamer Añadido!!!');
        }

        if (msg.content.includes('!dimeloTodo') || msg.content.includes('!dímeloTodo')) {
            QuotesController.getAllMessages().then((value)=>{
                value.forEach(element => {
                    msg.channel.send(element.message);
                });
            });
        }

        if (msg.content === '!help') {
            msg.reply(QuotesController.getHelpMessage());
        }

        if (msg.content === '!claps') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playFromYTURL(connection, 'https://www.youtube.com/watch?v=jDOrc8FmDy4',msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!rones') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playRones(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!hola') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playHola(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!cry') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playBoyCry(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content.includes('!play')) {
            let url = msg.content.substring('!play '.length);
            if(songRequests.length === 0){
                songRequests.push({url: url});
                if (msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join();
                    await SoundsController.playRadioYTURL(connection,msg, songRequests);
                } else {
                    msg.reply('Debes estar en un canal de voz!');
                }
            } else {
                songRequests.push({url: url});
            }
        }

        if (msg.content.includes('!stop')) {
            if (msg.member.voice.channel) {
                await msg.member.voice.channel.leave();
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === greetingsChannel);
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenido al Server, ${member}`);
});

client.login(process.env.DISCORD_TOKEN);

//STREAM INTERVALS
setInterval(() => {
    StreamsController.getStreamersInfo().then(streamersAlive => {
        streamersAlive.forEach(stream => {
            streamsHook.send(`@everyone ${stream['display_name']} está en vivo!` +
            `\n\n Únete en https://twitch.tv/${stream['display_name']}`
            )
        })
    })
}, 10000);

//json-server
server.use(middlewares)
server.use(router)
server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})