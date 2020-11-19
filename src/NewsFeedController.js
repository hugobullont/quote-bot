let Parser = require('rss-parser');
let rssParser = new Parser();

require('dotenv').config();

let apiURL = 'http://localhost:' + process.env.PORT;

exports.getNewsFeed = async () => {

    let finalArticles = [];

    let response = await fetch(apiURL + '/feeds',{
        mode: 'no-cors',
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
    });

    let newsFeed = await response.json();

    for(var i = 0; i<newsFeed.length; i++){
        let currentFeed = newsFeed[i];
        let feed = await rssParser.parseURL(currentFeed.url);
        let lastFeedArticle = feed.items[0];
        if (lastFeedArticle.guid !== currentFeed.lastID) {
            finalArticles.push(lastFeedArticle);
            currentFeed.lastID = lastFeedArticle.guid;

            await fetch(apiURL + `/feeds/${currentFeed.id}`,{
                mode: 'no-cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(currentFeed)
            });
        }
    }

    return finalArticles;
}