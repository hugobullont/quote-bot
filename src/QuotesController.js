const fs = require('fs');
const fetch = require('node-fetch');

exports.getRandomMessage = async () => {
    let response = await fetch('http://localhost:3000/messages',{
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
    let response = await fetch('http://localhost:3000/messages',{
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
    let response = await fetch('http://localhost:3000/messages',{
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
    return ("MonseBot es un bot que se encarga de almacenar citas."+
	"\n\n**!agregar <message>** -> Se utiliza para agregar una cita."+
	"\n\n**!dimeloTodo** -> Muestra todas las citas."+
	/*"\n\n**!airhorn** -> Suena una corneta mágicamente en el chat de voz." +
	"\n\n**!kk** -> Mágicamente Verdugo te dirá que eres caca."+*/
	"\n\n**!help** -> Muestra este sensual mensaje."+
	"\n\n**dimelo** -> Cualquier uso de dimelo dentro del chat hará que el bot lance una frase al azar. También con tilde. Gracias Crema."+
	"\n\n Los mantenimientos son esporádicos.");
}