const ipController = require('./controller/ip.controller');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const router = express();

router.use(bodyParser.json());

router.get('/', ipController.getAll);
router.get('/:name', ipController.get);
router.post('/:name', ipController.post);

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log("Server is running.");
});

setInterval(() => {
    http.get("https://outofcode-ip-service.herokuapp.com/default");
}, 600000);