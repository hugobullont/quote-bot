const Discord = require('discord.js');
const client = new Discord.Client();
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const QuotesController = require('./src/QuotesController');

require('dotenv').config();

//ReadyBot
client.on('ready', () => {
    console.log('Logged in.')
});

//onMessage
client.on('message', msg => { 
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
        msg.reply(QuotesController.getHelpMessage);
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
client.user.setStatus('!help');

//json-server
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})