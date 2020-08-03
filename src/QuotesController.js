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