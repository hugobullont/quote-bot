const fs = require('fs');
const fetch = require('node-fetch');

require('dotenv').config();

let apiURL = 'http://localhost:' + process.env.PORT;

exports.getRandomMessage = async () => {
    let response = await fetch(apiURL + '/messages',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });

    let value = await response.json();
    let messageNumber = Math.floor((Math.random() * value.length) - 1);
    return value[messageNumber].message;
}

exports.searchMessage = async (query) => {
    let response = await fetch(apiURL + '/messages?q='+ query, {
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
    });
    let value = await response.json();
    return value;
}

exports.deleteMessage = async (id) => {
    let response = await fetch(apiURL + '/messages/' + id, {
        mode: 'no-cors',
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
    });
    let value = await response.json();
    value.httpStatus = response.status;
    return value;
}

exports.getAllMessages = async () => {
    let response = await fetch(apiURL + '/messages',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });

    let value = await response.json();
    return value;
}

exports.addMessage = async (message) => {
    let finalMessage = '```' + message + '```';
    let response = await fetch(apiURL + '/messages',{
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            message: finalMessage
        })
    });
}

exports.getHelpMessage = (message) => {
    return ("MonseBot es un bot que se encarga de almacenar Quotes."+
	"\n\n**!agregar <message>** -> Se utiliza para agregar una Quote."+
    "\n\n**!dimeloTodo** -> Muestra todas las Quotes."+
    "\n\n**!buscarQuote <query>** -> Busca alguna Quote en específico. Se retornará junto a su Id. "+
    "\n\n**!eliminarQuote <id>** -> Hay Quotes que ya cumplieron su ciclo con nosotros y es preciso eliminarlas."+
	/*"\n\n**!airhorn** -> Suena una corneta mágicamente en el chat de voz." +
	"\n\n**!kk** -> Mágicamente Verdugo te dirá que eres caca."+*/
    "\n\n**!agregarTwitchStream <username>** -> Se utiliza para agregar un usuario de Twitch a las alertas."+
    "\n\n**!streamers** -> Muestra todos los streamers con alertas."+
    "\n\n**!help** -> Muestra este sensual mensaje."+
    "\n\n**!rones** -> CRU-CIAL  DE-TER-MI-NAN-TE (Audio)"+
    "\n\n**!hola** -> Quiero verte. Quiero verte. (Audio)"+
    "\n\n**!claps** -> Mágicamente te aplauden. Al fin. (Audio)"+
    "\n\n**!cry** -> Mágicamente un niño llorando para recordarte lo feo que puede llegar a ser tener hijos. (Audio)"+
    "\n\n**!play <YouTubeURL>** -> Una Radio Sensualona. (Audio)"+
	"\n\n**dimelo** -> Cualquier uso de dimelo dentro del chat hará que el bot lance una frase al azar. También con tilde. Gracias Crema."+
	"\n\n Los mantenimientos son esporádicos.");
}