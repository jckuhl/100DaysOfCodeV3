const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 12345

app.listen(port, console.log(`listening on port ${port}`))

app.get('/posts', (request, response)=> {
    console.log('posts');
});

app.post('/post', (request, response)=> {
    console.log('body: ', request.body);
    response.sendStatus(200);
});
