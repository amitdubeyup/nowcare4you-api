var jwt = require('jsonwebtoken');
var config = require('../config');
var jwtDecode = require('jwt-decode');

function users_auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        var decoded = jwtDecode(token);
        if (decoded.data.role == 'user' || decoded.data.role == 'admin') {
            jwt.verify(token, config.admin_secret, function(err, decoded) {
                if (err) {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Authentication failed!'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(400);
            return res.json({
                success: false,
                message: 'Authentication failed!'
            });
        }
    } else {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unauthorized access!'
        });
    }
}

module.exports = users_auth;