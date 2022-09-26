import fetch from 'node-fetch';

const { URL, URLSearchParams } = require('url');

let giphyAPI = "https://api.giphy.com/v1/";

exports.getRandomGIFbyTag = async (tag) => {

    let url = new URL(giphyAPI + 'gifs/random');
    let params = {
         'api_key': 'NrZ5IE0pdN9iFe5DW4dnhxcEd9XU6hVk',
         'tag': tag,
    }

    url.search = new URLSearchParams(params).toString();

    let response = await fetch(url);

    let gifResponse = await response.json();

    return gifResponse.data;
}