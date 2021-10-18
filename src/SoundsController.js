const ytdl = require('ytdl-core-discord');
const fs = require('fs');

exports.playFromYTURL = async (connection, url, msg) => {
    const dispatcher = connection.play(await ytdl(url), { type: 'opus' });

    dispatcher.setVolume(0.5);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRadioYTURL = async (connection, msg, songArray) => {
    const dispatcher = connection.play(await ytdl(songArray[0].url), { type: 'opus' });
    
    dispatcher.setVolume(0.5);

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

exports.playRones = async (connection,msg) => {
    const dispatcher = connection.play(fs.createReadStream('./assets/rones.ogg'), {
        type: 'ogg/opus',
    });

    dispatcher.setVolume(0.5);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playHola = async (connection, msg) => {
    const dispatcher = connection.play(fs.createReadStream('./assets/hola.ogg'), {
        type: 'ogg/opus',
    });

    dispatcher.setVolume(0.5);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playBoyCry = async (connection,msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/boy-cry.mp3');

    dispatcher.setVolume(0.5);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}


exports.playOhNo = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/ohNo.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRunComedy = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/run-comedy.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRun = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/run.mp3');

    dispatcher.setVolume(0.2);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playVuela = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/vuela.mp3');

    dispatcher.setVolume(0.2);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRedoble = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/redoble.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playYSeMarcho = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/y-se-marcho.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playSech = async (connection, msg) => {
    const dispatcher = connection.play('./assets/etesech.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playRaea = async (connection, msg) => {
    const dispatcher = connection.play('./assets/raea.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playPorQueSigues = async (connection, msg) => {
    const dispatcher = connection.play('./assets/pqsel.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playJeepeta = async (connection, msg) => {
    const dispatcher = connection.play('./assets/jeepeta.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playChupasela = async (connection, msg) => {
    const dispatcher = connection.play('./assets/chupasela.mp3');

    dispatcher.setVolume(0.9);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playTranquilos = async (connection, msg) => {
    const dispatcher = connection.play('./assets/tranquilos.mp3');

    dispatcher.setVolume(1.2);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playHey = async (connection, msg) => {
    const dispatcher = connection.play('./assets/hey.mp3');

    dispatcher.setVolume(1.0);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playCulos = async (connection, msg) => {
    const dispatcher = connection.play('./assets/culos.mp3');

    dispatcher.setVolume(0.7);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playCagon = async (connection, msg) => {
    const dispatcher = connection.play('./assets/cagon.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playCheChe = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/cheche.mp3');

    dispatcher.setVolume(0.3);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playGregorio = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/gregorio.mp3');

    dispatcher.setVolume(1);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}

exports.playMeArrecha = async (connection, msg) => {
    //Debes ingresar la ruta completa.
    const dispatcher = connection.play('./assets/meArrecha.mp3');

    dispatcher.setVolume(0.2);

    dispatcher.on('finish', () => {
        msg.member.voice.channel.leave();
    });
}