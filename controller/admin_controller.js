let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
// Register new user
exports.admin_login = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM admin_table WHERE username = \'' + req.body.username + '\'', function (err, result) {
            if (err) throw err;
            if (typeof result[0] !== 'undefined') {
                let login_info = {
                    password: req.body.password,
                }
                if(login_info.password == result[0].password){
                    req.token = jsonwebToken.sign({ id: result[0].admin_id }, constance.sign_admin)
                    next()
                }else{
                    res.status(200).json(errorMessages.err_wrong_password)
                }
               
            } else {
                res.status(200).json(errorMessages.err_user_not_found)
            }
        })
    }
}



exports.check_admin = function () {
    return function (req, res, next) {

        // console.log(req)

        db.query('SELECT * FROM user_information WHERE user_id = \'' + req.user_id + '\'', function (err, result) {
            if (err) throw err;
            if (typeof result[0] !== 'undefined') {

                    req.token = jsonwebToken.sign({ id: result[0].admin_id }, constance.sign_admin)
                    req.admin = result[0].admin
                    next()

            } else {
                res.status(200).json(errorMessages.err_user_not_found)
            }
        })
    }
}