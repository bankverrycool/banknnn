var errorMessages = require('../const/error_message')
var jsonwebToken = require('jsonwebtoken')
var db = require('../connection/dbConnection')
var constance = require('../const/constance')

exports.validate_token = function () {
    return function (req, res, next) {
        // console.log(req.session.token)
        if (!Boolean(req.headers['authorization'])) {
            res.status(200).json({
                'success': false,
                message: errorMessages.err_required_token
            })
        } else {
            // console.log("token")
            jsonwebToken.verify(req.headers.authorization, constance.sign, (err, decode) => {
                if (err) {
                    res.status(200).json(errorMessages.err_required_fingerprint_token)
                } else {
                    req.user_id = decode.id
                    next()
                }
            })
        }
    }
}

exports.validate_token_admin = function () {
    return function (req, res, next) {
        // console.log(req.session.token)
        if (!Boolean(req.headers['authorization'])) {
            res.status(200).json({
                'success': false,
                message: errorMessages.err_required_token
            })
        } else {
            // console.log("token")
            jsonwebToken.verify(req.headers.authorization, constance.sign, (err, decode) => {
                if (err) {
                    res.status(200).json(errorMessages.err_required_fingerprint_token)
                } else {
                    if (decode.type === 1) {
                        req.user_id = decode.id
                        next()
                    } else {
                        res.status(200).json(errorMessages.err_required_fingerprint_token)
                    }
                }
            })
        }
    }
}

// exports.validate_token_admin = function () {
//     return function (req, res, next) {
//         // console.log(req.session.token)
//     if (!Boolean(req.headers['authorization'])) {
//             res.status(200).json({ 'success': false, message: errorMessages.err_required_token })
//         }
//         else {
//            // console.log("token")
//             jsonwebToken.verify(req.headers.authorization, constance.sign_admin, (err, decode) => {
//                 if (err) {
//                     res.status(200).json(errorMessages.err_required_fingerprint_token )
//                 } else {
//                     req.admin_id = decode.id
//                     next()
//                 }
//             })
//         }
//     }
// }

exports.validate_user_and_admin = function () {
    return function (req, res, next) {
        // console.log(req.session.token)
        if (!Boolean(req.headers['authorization'])) {
            res.status(200).json({
                'success': false,
                message: errorMessages.err_required_token
            })
        } else {
            // console.log("token")
            jsonwebToken.verify(req.headers.authorization, constance.sign, (err, decode) => {
                if (err) {
                    jsonwebToken.verify(req.headers.authorization, constance.sign_admin, (err, decode) => {
                        if (err) {
                            res.status(200).json(errorMessages.err_required_fingerprint_token)
                        } else {
                            next()
                        }
                    })
                } else {
                    next()
                }
            })
        }
    }
}


exports.validate_user_register = function () {
    return function (req, res, next) {
        if (req.body.email && req.body.password) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}
//
// exports.validate_user_token = function () {
//     return function (req, res, next) {
//         if (req.body.token && req.body.password){
//             next();
//         }else{
//             res.status(200).json(errorMessages.invalid_data)
//             return;
//         }
//     }
// }

exports.validate_get_land = function () {
    return function (req, res, next) {
        if (req.body.announce_id) {
            next();
        } else {
            res.status(200).json(errorMessages.err_required_announce_id)
            return;
        }
    }
}

exports.validate_user_id = function () {
    return function (req, res, next) {
        if (req.body.user_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
        }

    }
}



exports.validate_user_login = function () {
    return function (req, res, next) {
        if (req.body.email && req.body.password) {
            next();
        } else {

            res.status(200).json(errorMessages.invalid_data)
        }

    }
}


exports.validate_user_confirm_payment = function () {
    return function (req, res, next) {
        if (req.body.payment_image && req.body.order_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
        }

    }
}
exports.validate_admin_confirm_payment = function () {
    return function (req, res, next) {
        if (req.body.user_id && req.body.land_id && req.body.order_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
        }

    }
}



exports.validate_admin_login = function () {
    return function (req, res, next) {
        if (req.body.username && req.body.password) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}


exports.validate_check_admin = function () {
    return function (req, res, next) {
        if (req.body.username && req.body.password) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}



exports.validate_create_news = function () {
    return function (req, res, next) {
        if (req.body.title && req.body.cate && req.body.category_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}


exports.validate_update_news = function () {
    return function (req, res, next) {
        if (req.body.news_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}


exports.validate_facebook_login = function () {
    return function (req, res, next) {
        if (req.body.facebook_email && req.body.noti_token && req.body.facebook_id) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data)
            return;
        }
    }
}