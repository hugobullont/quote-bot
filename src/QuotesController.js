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
	"\n\n**!agregar <message>** -> Se utiliza para agregar un Quote."+
	"\n\n**!dimeloTodo** -> Muestra todas las citas."+
	/*"\n\n**!airhorn** -> Suena una corneta mágicamente en el chat de voz." +
	"\n\n**!kk** -> Mágicamente Verdugo te dirá que eres caca."+*/
    "\n\n**!help** -> Muestra este sensual mensaje."+
    "\n\n**!claps** -> Mágicamente te aplauden. Al fin."+
    "\n\n**!cry** -> Mágicamente un niño llorando para recordarte lo feo que puede llegar a ser tener hijos."+
    "\n\n**!play <YouTubeURL>** -> Una Radio Sensualona."+
	"\n\n**dimelo** -> Cualquier uso de dimelo dentro del chat hará que el bot lance una frase al azar. También con tilde. Gracias Crema."+
	"\n\n Los mantenimientos son esporádicos.");
}