const mysql = require('mysql');

const clearDB = process.env.CLEARDB_DATABASE_URL || ""
const remove = clearDB.replace("mysql://", "");
const split1 = remove.split("?")[0].split(":")
const user = split1[0]
const split2 = split1[1].split("@")
const password = split2[0]
const split3 = split2[1].split("/")
const host = split3[0]
const database = split3[1]

const DBConfig = {
    host: host,
    user: user,
    password: password,
    database: database
};

let connection;

function handleDisconnect() {
    console.log('Connecting Database.');
    connection = mysql.createConnection(DBConfig);
    connection.connect(err => {
        if (err) {
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            handleDisconnect();
        }
    });
}

handleDisconnect();

exports.readAll = function (handler) {
    try {
        const select = "select * from user";
        connection.query(select, function (error, results, fields) {
            if (error) {
                handler(null, error);
            } else {
                if (results.count === 0 || results[0] === undefined) {
                    handler();
                } else {
                    const ips = results.map(x => {
                        return {'name': x.name, 'ip': x.address}
                    })
                    handler(ips);
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

exports.read = function (name, handler) {
    try {
        const select = "select address from user where name='" + name + "'";
        connection.query(select, function (error, results, fields) {
            if (error) {
                handler(null, error);
            } else {
                if (results.count === 0 || results[0] === undefined) {
                    handler('', null);
                } else {
                    const ip = results[0].address;
                    handler(ip, null);
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

exports.create = function (name, ip, handler) {
    try {
        const select = "insert into user (name, address) values ('" + name + "', '" + ip + "')";
        connection.query(select, function (error, results, fields) {
            if (error) {
                handler(null, error);
            } else {
                handler(ip, null);
            }
        });
    } catch (error) {
        throw error;
    }
}

exports.update = function (name, ip, handler) {
    try {
        const select = "update user set address='" + ip + "' where name='" + name + "'";
        connection.query(select, function (error, results, fields) {
            if (error) {
                handler(null, error);
            } else {
                handler(ip, null);
            }
        });
    } catch (error) {
        throw error;
    }
}