const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.TWIT_CONSUMER_KEY,
    consumer_secret: process.env.TWIT_CONSUMER_SECRET,
    access_token: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_SECRET,
    timeout_ms: 60*1000
});

function tweetStatus(status) {
    const hashtag = ' #100DaysOfCode';
    const MAX_CHARS = 280
    status = status.substring(0, MAX_CHARS - hashtag.length) + hashtag;

    return new Promise((resolve, reject) => {
        T.post('statuses/update', { status }, (error, result, response)=> {
            if(error) {
                reject(error.message);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = tweetStatus;