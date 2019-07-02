const bcrypt = require('bcrypt');
const Client = require('../Models/Client.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class Clients {

    static async register(req, res) {
        // console.log(process.env.SALT);
        try {
            // Has Password
            let salt = await bcrypt.genSalt(10);

            let hashPassword = await bcrypt.hash(req.body.password, salt);

            // Generated Client Secret
            let secret = await crypto.randomBytes(48);
            var token = secret.toString('hex');

            // Store all in Client table
            req.body.secret = token;
            req.body.password = hashPassword;
            const result = await Client.create(req.body);
            res.send({
                message: result
            });

        } catch (error) {
            console.log(error);
        }

    }

    static async login(req, res) {
        const {
            username,
            password
        } = req.body;

        if (username && password) {

            const client = await Client.find(username);

            if (!client) {
                res.status(401).json({
                    msg: "No Client found",
                    client
                });
            }

            if (await bcrypt.compare(password, client.password)) {
                let payload = {
                    id: client.id
                };
                let token = jwt.sign(payload, process.env.SECRET);
                res.json({
                    msg: 'OK',
                    token: token
                })
            } else {
                res.status(401).json({
                    msg: 'Password is incorrect'
                });
            }
        }

    }
}

module.exports = Clients;