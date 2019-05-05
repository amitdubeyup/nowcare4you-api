const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const config = require('../config');

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    socialLogin: socialLogin
}

function registerUser(req, res) {
    let query = {
        $or: [{
                email: {
                    $regex: req.body.email,
                    $options: 'i'
                }
            }
        ]
    };
    Users.find(query).then((userResult) => {
        if (userResult.length > 0) {
            res.status(400);
            return res.json({
                success: false,
                message: "User already exit!"
            });
        } else {

            let users = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(users.password, salt, function (err, hash) {
                    users.password = hash;
                    users.save(users).then((response) => {
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        const payload = {
                            _id: response._id,
                            name: response.name,
                            email: response.email,
                            login_time: date.getTime()
                        }
                        const token = jwt.sign({
                            data: payload
                        }, config.users_secret, {
                            expiresIn: config.token_expire
                        });
                        res.status(200);
                        return res.json({
                            success: true,
                            message: "Logged in successfully!",
                            token: token
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to create account!'
                        });
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to create account!'
        });
    });
}

function loginUser(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400);
        return res.json({
            success: false,
            message: "Email & password is required!"
        });
    } else {
        Users.findOne({
            email: req.body.email
        }).then((response) => {
            if (response) {
                if (bcrypt.compareSync(req.body.password, response.password)) {
                    if (response.status == 'inactive') {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: "Account blocked, Please contact admin!"
                        });
                    } else if (response.status == 'pending') {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: "Approval pending, Please contact admin!"
                        });
                    } else {
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        const payload = {
                            _id: response._id,
                            name: response.name,
                            email: response.email,
                            login_time: date.getTime()
                        }
                        const token = jwt.sign({
                            data: payload
                        }, config.users_secret, {
                            expiresIn: config.token_expire
                        });
                        res.status(200);
                        return res.json({
                            success: true,
                            message: "Logged in successfully!",
                            token: token
                        });
                    }
                } else {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: "Email or password is incorrect!"
                    });
                }
            } else {
                res.status(400);
                return res.json({
                    success: false,
                    message: "Account does not exits!"
                });
            }
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: "Unable to login!"
            });
        });
    }
}

function socialLogin(req, res) {
    Users.findOne({
        email: req.body.email
    }).then((response) => {
        if (response) {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            const payload = {
                _id: response._id,
                name: response.name,
                email: response.email,
                login_time: date.getTime()
            }
            const token = jwt.sign({
                data: payload
            }, config.users_secret, {
                expiresIn: config.token_expire
            });
            res.status(200);
            return res.json({
                success: true,
                message: "Logged in successfully!",
                token: token
            });
        } else {
            let users = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(users.password, salt, function (err, hash) {
                    users.password = hash;
                    users.save(users).then((response) => {
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        const payload = {
                            _id: response._id,
                            name: response.name,
                            email: response.email,
                            login_time: date.getTime()
                        }
                        const token = jwt.sign({
                            data: payload
                        }, config.users_secret, {
                            expiresIn: config.token_expire
                        });
                        res.status(200);
                        return res.json({
                            success: true,
                            message: "Logged in successfully!",
                            token: token
                        });
                    }).catch((error) => {
                        res.status(400);
                        return res.json({
                            success: false,
                            message: 'Unable to login!'
                        });
                    });
                });
            });
        }
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to login!"
        });
    });
}