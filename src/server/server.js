const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongooseConnect = require('./database');
const PostStatus = require('./models/post.model');
const RoundModel = require('./models/round.model');
const ResourceModel = require('./models/resource.model');
const UserModel = require('./models/user.model');
const tweetStatus = require('./twitter');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 12345;

// start server and connect to Mongo via Mongoose
app.listen(port, ()=> {
    MongooseConnect();
    console.log(`listening on port ${port}\n`)
});

// generic error handle, defaults to 404
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

/** RESOURCES API */

app.get('/resources', (request, response)=> {
    ResourceModel.find((error, resources)=> {
        if(error) {
            handleError(error);
        } else {
            response.send(resources);
        }
    });
})

app.post('/newresource', (request, response)=> {
    const resource = new ResourceModel(request.body);
    resource.save(error => {
        if(error) {
            handleError(error);
        } else {
            response.sendStatus(200);
        }
    })
});

app.delete('/deleteresource/:id', (request, response)=> {
    ResourceModel.deleteOne({ id: request.params.id }, error => {
        if(error) {
            handleError(error);
        } else {
            response.sendStatus(200);
        }
    });
});

/** TWEETS */
app.post('/tweet', (request, response)=> {
    tweetStatus(request.body.body)
        .then(status => response.send(JSON.stringify({status})))
        .catch(error => response.send(JSON.stringify({status: error})));
});

/** Register */
app.post('/register', (request, response)=> {
    const user = new UserModel(request.body);
    user.save(error => {
        if(error) {
            handleError(error);
        } else {
            response.sendStatus(200);
        }
    });
});