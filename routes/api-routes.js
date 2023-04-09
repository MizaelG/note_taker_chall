const router = require('express').Router();
const fs = require('fs');
// npm install uuid
const {v4: uuidv4} = require('uuid');

// Get the request to the routers end point
router.get('/api/notes', async (request_obj, response_obj) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json','utf-8'))
    response_obj.json(dbJson);
});

// Post Request to the routers end point
router.post('/api/notes', (request_obj, response_obj) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json','utf-8'))
    const newFeedBack = { title: request_obj.body.title, 
    text: request_obj.body.text,
    id: uuidv4()
    };
    dbJson.push(newFeedBack);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    response_obj.json(dbJson);
});

router.delete('/api/notes/:id', (request_obj, response_obj) => {
    let data = fs.readFileSync('db/db.json', 'utf-8');
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== request_obj.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
    response_obj.json('Note Deleted');
});

module.exports = router;