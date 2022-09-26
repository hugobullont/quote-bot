const fetch = require('node-fetch');
//import fetch from 'node-fetch';

require('dotenv').config();

let apiURL = 'http://localhost:' + process.env.PORT;
let twitchAPIURL = 'https://api.twitch.tv/helix/'
let token = process.env.TWITCH_ACCESS_TOKEN;
let clientID = process.env.TWITCH_CLIENT_ID;

exports.getStreamersInfo = async () => {
    let streamsAlive = [];
    let response = await fetch(apiURL + '/streams',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });
    
    let streamers = await response.json();
    
    for(var i = 0; i<streamers.length; i++){
        let streamer = streamers[i];
        let streamInfoResponse = await fetch(twitchAPIURL + `search/channels?query=${streamer.username}&first=1`,{
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'client-id': clientID
            }
        });
        console.log(streamInfoResponse);
        let streamInfoJSON = await streamInfoResponse.json();
        if(streamInfoJSON.data.length > 0) {
            let streamInfo = streamInfoJSON.data[0];

            streamInfo.insideDBInfo = streamer;
            if(streamInfo['is_live'] && !streamer.isLive){
                streamsAlive.push(streamInfo);
                streamer.isLive = true;
                await fetch(apiURL + `/streams/${streamer.id}`,{
                    mode: 'no-cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(streamer)
                });
            }

            if(!streamInfo['is_live'] && streamer.isLive) {
                streamer.isLive = false;
                await fetch(apiURL + `/streams/${streamer.id}`,{
                    mode: 'no-cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(streamer)
                });
            }
        }
    }
    
    return streamsAlive;

};

exports.subscribeToStreamer = async (username, streamer) => {
    let responseStreamers = await fetch(apiURL + '/streams',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });
    
    let streamers = await responseStreamers.json();
    let streamerObj = null;

    streamers.forEach((strObj) => {
        if(strObj.username === streamer){
            streamerObj = strObj;
        }
    });

    if(streamerObj !== null) {
        streamerObj.subscribers.push(username);

        await fetch(apiURL + `/streams/${streamerObj.id}`,{
            mode: 'no-cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(streamerObj)
        });
    } else {
        let subscribersArray = [];
        subscribersArray.push(username);
        await fetch(apiURL + '/streams',{
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: streamer,
                isLive: false,
                subscribers: subscribersArray,
            })
        });
    }
    
    return true;
}

exports.getStreamers = async () => {
    let response = await fetch(apiURL + '/streams',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });
    
    let streamers = await response.json();
    return streamers;
}

exports.addStreamer = async (username) => {
    let response = await fetch(apiURL + '/streams',{
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            isLive: false,
            subscribers: [],
        })
    });
}