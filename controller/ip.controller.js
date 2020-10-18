const userService = require('../service/user.service');

exports.getAll = async function (request, response) {
    try {
        userService.readAll((ips, error) => {
            console.log('IP address is : ', ips);
            if (error) {
                response.status(500).json({error: error.toString()})
            } else if (ips.count === 0) {
                response.status(204).send();
            } else {
                response.status(200).json(
                    {
                        code: '0000',
                        message: 'success',
                        ips: ips
                    }
                );
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
            console.log('IP is : ', ip);
            if (error) {
                response.status(500).json({error: error.toString()})
            } else if (ip === '') {
                response.status(204).send();
            } else {
                response.status(200).json(
                    {
                        code: '0000',
                        message: 'success',
                        ip: ip
                    }
                );
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
                console.log('IP is : ', ip);
                response.json (
                    {
                        code: '0000',
                        message: 'success',
                        ip: ip
                    }
                );
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
