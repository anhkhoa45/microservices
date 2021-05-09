const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const event = req.body
    let post
    console.log(`Event received. ${event.type}`)
    switch (event.type) {
        case 'PostCreated':
            posts[event.data.id] = event.data
            posts[event.data.id].comments = []
            break;
        case 'CommentCreated':
            post = posts[event.data.postId]
            post.comments.push({ id: event.data.id, content: event.data.content })
            break;
        case 'CommentUpdated':
            post = posts[event.data.postId]
            const comment = post.comments.find( c => c.id === event.data.id)
            comment.status = event.data.status
            comment.content = event.data.content
            break;
        default:
            break;
    }
    res.send({ status: 'OK' })
})

app.listen(4002, () => {
    console.log('Listening on port 4002')
})