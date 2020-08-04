const Discord = require('discord.js');
const client = new Discord.Client();
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const QuotesController = require('./src/QuotesController');
const SoundsController = require('./src/SoundsController');

let songRequests = [];

require('dotenv').config();

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

        if (msg.content.includes('!agregar')) {
            let message = msg.content.substring('!agregar '.length);
            QuotesController.addMessage(message);
            msg.reply('Mensaje Añadido!!!')
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
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenido al Server, ${member}`);
  });

client.login(process.env.DISCORD_TOKEN);

//json-server
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})