const router = require('express').Router();
const path = require('path');

router.get('/', (request_obj, response_obj) => {
    response_obj.sendFile(path.join(process.cwd(), 'public/index.html'))
});

router.get('/notes', (request_obj, response_obj) => {
    response_obj.sendFile(path.join(process.cwd(), 'public/notes.html'))
});

module.exports = router;