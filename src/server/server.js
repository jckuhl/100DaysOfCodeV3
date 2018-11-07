const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongooseConnect = require('./database');
const PostStatus = require('./models/post.model');
const RoundModel = require('./models/round.model');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 12345;

app.listen(port, ()=> {
    MongooseConnect();
    console.log(`listening on port ${port}\n`)
});

const handleError = (error, response, status=404) => {
    console.error(error);
    response.sendStatus(status);
}

/** POSTS API */

app.get('/posts', (request, response)=> {
    PostStatus.find((error, posts)=> {
        if(error) {
            handleError(error, response)
        } else {
            response.send(posts);
        }
    })
});

app.post('/post', (request, response)=> {
    const post = new PostStatus(request.body);
    post.save(error => {
        if(error) {
            handleError(error, response);
        } else {
            response.sendStatus(200);
        }
    });
});

app.delete('/delete/:id', (request, response)=> {
    PostStatus.deleteOne({ id: request.params.id }, (error)=> {
        if(error) {
            handleError(error, response)
        } else {
            response.sendStatus(200)
        }
    });
})

app.put('/update/:id', (request, response)=> {
    const post = request.body;
    const condition = { id: request.params.id }
    const update = { body: post.body, title: post.title }
    PostStatus.updateOne(condition, update, (error)=> {
        if(error) {
            handleError(error, response)
        } else {
            response.sendStatus(200);
        }
    });
});

/** ROUNDS API */

app.get('/rounds', (request, response)=> {
    RoundModel.find((error, rounds)=> {
        if(error) {
            handleError(error);
        } else {
            response.send(rounds);
        }
    });
});

app.post('/newround', (request, response)=> {
    const round = new RoundModel(request.body);
    round.save(error => {
        if(error) {
            handleError(error);
        } else {
            response.sendStatus(200);
        }
    });
});