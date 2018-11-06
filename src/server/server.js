const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 12345

app.listen(port, console.log(`listening on port ${port}`))

app.get('/posts', (request, response)=> {
    console.log('posts');
});

app.post('/post', (request, response)=> {
    // console.log('body: ', request.body);
    const post = new database.PostStatus(request.body);
    post.save(error => console.error(error));
    response.sendStatus(200);
});
