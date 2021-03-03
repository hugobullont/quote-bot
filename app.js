const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: false});
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const QuotesController = require('./src/QuotesController');
const SoundsController = require('./src/SoundsController');
const StreamsController = require('./src/StreamsController');
const NewsFeedController = require('./src/NewsFeedController');
const GifController = require('./src/GifController');

let songRequests = [];

require('dotenv').config();

let greetingsChannel = process.env.DISCORD_GREETING_CHANNEL;
let botChannelOwner = process.env.DISCORD_OWNER_STREAM;
let streamChannel = process.env.DISCORD_STREAM_CHANNEL;
let adminRole = process.env.DISCORD_ADMIN_ROLE;
let radioEnabled = process.env.ENABLE_RADIO;

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
        if (msg.content.toLowerCase() === 'dimelo' || msg.content.toLowerCase() === 'dímelo' || msg.content.toLowerCase().includes('dimelo') || msg.content.toLowerCase().includes('dímelo')) {
            QuotesController.getRandomMessage().then((message)=>{
                msg.channel.send(message);
            });
        }

        if (msg.content.includes('!buscarQuote')) {
            let query = msg.content.substring('!buscarQuote '.length);
            QuotesController.searchMessage(query).then((result) => {
                if (result.length > 0) {
                    msg.reply('Hemos encontrado las siguientes Quotes. Puedes usar el Id para borrarlas. ');
                    result.forEach(element => {
                        msg.channel.send(`Id: ${element.id}`);
                        if(element.author){
                            msg.channel.send(`Creador: ${element.author}`);
                        }
                        msg.channel.send(element.message);
                    })
                } else {
                    msg.reply('No hay Quotes que coincidan con la búsqueda. :( ');
                }
            })
        }

        if (msg.content.includes('!eliminarQuote')) {
            if(msg.member.roles.cache.find(role => role.name === adminRole)){
                let id = msg.content.substring('!eliminarQuote '.length);
                QuotesController.deleteMessage(id).then(response => {
                    if (response.httpStatus === 200) {
                        msg.reply('Borramos la Quote correctamente!');
                    } else {
                        msg.reply('Bueno, parece que esa Quote no existe. Al menos no en este mundo.');
                    }
                });
            } else {
                msg.reply('Mira, cómo te explico. No tienes permisos para esto.')
            }
        }

        if (msg.content.includes('!agregar') && !msg.content.includes('!agregarTwitchStream')) {
            let message = msg.content.substring('!agregar '.length);
            QuotesController.addMessage(message, msg.author.username);
            msg.reply('Mensaje Añadido!!!')
        }

        if (msg.content.includes('!agregarTwitchStream')) {
            let username = msg.content.substring('!agregarTwitchStream '.length);
            StreamsController.addStreamer(username);
            msg.reply('Streamer Añadido!!!');
        }

        if (msg.content.includes('!streamers')) {
            let message = 'Los streamers con alertas son: '
            StreamsController.getStreamers().then(value => {
                value.forEach(element => {
                    message = message + `\n\n https://twitch.tv/${element.username}`;
                })
                msg.reply(message);
            })
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

        if(msg.content === '!sech') {
            GifController.getRandomGIFbyTag('sech').then((value) => {
                const embed = new Discord.MessageEmbed()
                .setURL(value.embed_url);
                msg.channel.send(embed);
            });
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

        if (msg.content === '!ohno') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playOhNo(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!corre') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playRunComedy(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!run') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playRun(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!vuela') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playVuela(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!redoble') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playRedoble(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!gregorio') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playGregorio(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!meArrecha') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playMeArrecha(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!cheche') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playCheChe(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!eteSech') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playSech(connection,msg);
            } else {
                msg.reply('Debes estar en un canal de voz!');
            }
        }

        if (msg.content === '!seMarcho' || msg.content === '!semarcho') {
            if (msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join();
                await SoundsController.playYSeMarcho(connection,msg);
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

        if (msg.content.includes('!play') && radioEnabled) {
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
    const channel = member.guild.channels.cache.find(ch => ch.id === greetingsChannel);
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Bienvenido al Server, ${member}`);
});

client.login(process.env.DISCORD_TOKEN);

//STREAM INTERVALS
setInterval(() => {
    StreamsController.getStreamersInfo().then(streamersAlive => {
        console.log('StreamersInfo response');
        console.log(streamersAlive);
        streamersAlive.forEach(stream => {
            /*streamsHook.send(`@everyone ${stream['display_name']} está en vivo!` +
            `\n\n Únete en https://twitch.tv/${stream['display_name']}`
            )*/
            console.log('Inside StreamersAlive');
            console.log(stream);
            const channel = client.channels.cache.find(ch => ch.id === streamChannel);
            console.log(channel);
            if (!channel) return;
            let message = '';
            if(stream['display_name'] === botChannelOwner){
                message = `@everyone ${stream['display_name']} está en vivo!` +
                `\n\n Únete en https://twitch.tv/${stream['display_name']}`
            } else {
                message = `${stream['display_name']} está en vivo!` +
                `\n\n Únete en https://twitch.tv/${stream['display_name']}`
            }
            channel.send(message);
        });
    })
}, 60000);


//NEWS INTERVAL

setInterval(() => {
    NewsFeedController.getNewsFeed().then(newsArray => {
        newsArray.forEach(article => {
            console.log(article.channel);
            const channel = client.channels.cache.find(ch => {console.log(ch.id); return ch.id === article.channel;});
            console.log(channel);
            if (!channel) return;
            let message = `${article.title} \n ${article.link}`;
            channel.send(message);
        })
    })
}, 10000);

//json-server
server.use(middlewares)
server.use(router)
server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})