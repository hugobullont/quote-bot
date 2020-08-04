const ytdl = require('ytdl-core-discord');

exports.playFromYTURL = async (connection, url, msg) => {
    const dispatcher = connection.play(await ytdl(url), { type: 'opus' });

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRadioYTURL = async (connection, msg, songArray) => {
    const dispatcher = connection.play(await ytdl(songArray[0].url), { type: 'opus' });

    dispatcher.on('finish', async () => {
        console.log(songArray);
        songArray.shift();
        console.log(songArray);
        if(songArray.length === 0){
            msg.member.voice.channel.leave();
            return;
        } else {
            await this.playRadioYTURL(connection,msg,songArray);
        }
    });
}

exports.playBoyCry = async (connection,msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('/var/development/LoudyBot/quote-bot/assets/boy-cry.mp3');
    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}