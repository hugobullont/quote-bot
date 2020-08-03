const fs = require('fs');

exports.getRandomMessage = () => {
    fs.readFile('mes.txt', 'utf8', (err,data) => { 
        if (err) {
            return console.log(err);
        }
        let array = data.split('\n');
        Math.floor((Math.random() * 10) + 1);
    })
}