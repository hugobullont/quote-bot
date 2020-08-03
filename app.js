const Discord = require('discord.js');
const client = new Discord.Client();

const QuotesController = require('./src/QuotesController');

require('dotenv').config();

//ReadyBot
client.on('ready', () => {
    console.log('Logged in.')
});

client.on('message', msg => { 
    if (msg.content === 'dimelo' || msg.content === 'dímelo') {
        QuotesController.getMessages();
    }
});



client.login(process.env.DISCORD_TOKEN);