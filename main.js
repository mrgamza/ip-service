require ('newrelic')

const ipController = require('./controller/ip.controller');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const router = express();

router.use(bodyParser.json());

router.get('/', ipController.getHello);
router.get('/:name', ipController.get);
router.post('/:name', ipController.post);

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log("Server is running.");
});

setInterval(() => {
    console.log('server interval call');
    http.get("http://outofcode-ip-service.herokuapp.com/default");
}, 600000);