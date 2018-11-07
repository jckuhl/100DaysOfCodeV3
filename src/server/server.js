const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 12345;

app.listen(port, ()=> {
    Database.MongooseConnect();
    console.log(`listening on port ${port}\n`)
});

const handleError = (error, response, status=404) => {
    console.error(error);
    response.sendStatus(status);
}

app.get('/posts', (request, response)=> {
    Database.PostStatus.find((error, posts)=> {
        if(error) {
            handleError(error, response)
        } else {
            response.send(posts);
        }
    })
});

app.post('/post', (request, response)=> {
    const post = new Database.PostStatus(request.body);
    post.save(error => {
        handleError(error, response);
        response.sendStatus(404);
    });
    response.sendStatus(200);
});

app.delete('/delete/:id', (request, response)=> {
    Database.PostStatus.deleteOne({ id: request.params.id }, (error)=> {
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
    Database.PostStatus.updateOne(condition, update, (error)=> {
        if(error) {
            handleError(error, response)
        } else {
            response.sendStatus(200);
        }
    });
})
