const ytdl = require('ytdl-core-discord');

exports.playFromYTURL = async (connection, url, msg) => {
    const dispatcher = connection.play(await ytdl(url), { type: 'opus' });

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playBoyCry = async (connection,msg) => {
    const dispatcher = connection.play('../assets/boy-cry.mp3');
    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}