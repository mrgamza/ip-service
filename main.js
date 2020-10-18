const ipController = require('./controller/ip.controller');
const express = require('express');
const bodyParser = require('body-parser');

const router = express();

router.use(bodyParser.json());

router.get('/', (request, response) => {
    response.send('Hello, ip-service');
})

router.get('/ip/', ipController.getAll);
router.get('/ip/:name', ipController.get);
router.post('/ip/:name', ipController.post);

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log("Server is running.");
});
