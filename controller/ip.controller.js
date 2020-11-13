const userService = require('../service/user.service');

function success(response, message) {
    response.status(200).json(
        {
            code: '0000',
            message: 'success',
            ips: message
        }
    );
}

exports.getAll = async function (request, response) {
    try {
        userService.readAll((ips, error) => {
            if (error) {
                response.status(500).json({error: error.toString()})
            } else if (ips.count === 0) {
                response.status(204).send();
            } else {
                success(response, ips);
            }
        });
    } catch (error) {
        response.status(500).json({ error: error.toString() })
    }
}

exports.get = async function (request, response) {
    try {
        const name = request.params.name;

        userService.read(name, (ip, error) => {
            if (error) {
                response.status(500).json({error: error.toString()})
            } else if (ip === '') {
                response.status(204).send();
            } else {
                success(response, ip);
            }
        });
    } catch (error) {
        response.status(500).json({ error: error.toString() })
    }
}

exports.post = async function (request, response) {
    try {
        const name = request.params.name;
        const address = request.body.address;

        const handle = function (error, response, ip) {
            if (error) {
                response.status(500).json({error: error.toString()})
            } else {
                success(response, ip);
            }
        }

        userService.read(name, (ip, error) => {
            if (error) {
                response.status(500).json({error: error.toString()})
            } else {
                if (ip === '') {
                    userService.create(name, address, (ip, error) => {
                        handle(error, response, ip);
                    });
                } else {
                    userService.update(name, address, (ip, error) => {
                        handle(error, response, ip);
                    });
                }
            }
        })
    } catch (error) {
        response.status(500).json({error: error.toString()})
    }
}
