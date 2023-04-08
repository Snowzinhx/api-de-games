const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.TOKEN_SECRET;

function userAuth(req, res, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        res.status(401).json({ error: "Token inválido!" })
    } else {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        if (!token) {
            res.status(401).json({ error: "Token inválido!" })
        } else {
            jwt.verify(token, jwtSecret, (err, data) => {
                if (err) {
                    res.status(401).json({ error: "Token inválido!" })
                } else {
                    req.token = token;
                    req.loggedUser = {id: data.id, email: data.email}
                    next();
                }
            })
        }

    }

    
};

module.exports = userAuth;