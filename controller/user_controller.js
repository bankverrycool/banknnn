let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')
// Register new user



exports.user_register = function () {
    return function (req, res, next) {

                db.query(`SELECT email FROM user_information WHERE email = '${req.body.email }'`, function (err, resultUser) {
                    if (err) throw err;
                    if (typeof resultUser[0] === 'undefined') {

                        let registerInfo = {
                            email: req.body.email,
                            password: encrytp.encrytp(req.body.password),
                            address: req.body.address,
                            name: req.body.name,
                            phone_number: req.body.phone_number,
                            last_name: req.body.last_name,
                            user_type: 0,
                        }
                        db.query(`INSERT INTO user_information (email,password,address,name,last_name,user_type,phone_number) VALUES
                        ('${registerInfo.email}','${registerInfo.password}','${registerInfo.address}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.user_type}','${registerInfo.phone_number}')`, function (err, result) {
                            if (err) throw err;
                            // console.log(result)
                            // req.token = jsonwebToken.sign({id: result.insertId }, constance.sign)
                            next()
                        })

                        db.query('SELECT * FROM user_information', function (err, result) {
                            if (err) throw err;
                            req.user_result = result
                            next()

                        })

                    } else {
                            res.status(200).json(errorMessages.err_user_already)
                            return;
                    }


                })


    }
}

//
// exports.user_facebook_login = function () {
//     return function (req, res, next) {
//         db.query('SELECT noti_token, user_id ,email FROM user_information WHERE email = \'' + req.body.facebook_email + '\'', function (err, resultUser) {
//             if (err) throw err;
//             if( typeof resultUser[0] !== 'undefined'){
//                 let registerInfo ={
//                     email : req.body.facebook_email,
//                     cate: req.body.cate,
//                     noti_token : req.body.noti_token
//                 }
//                 db.query('UPDATE user_information\
//                 SET cate = \'' + registerInfo.cate + '\'\ ,email = \'' + registerInfo.email + '\'\  , noti_token = \'' + registerInfo.noti_token + '\'WHERE email = \'' + resultUser[0].email + '\'', function (err, result) {
//                     if (err) throw err;
//                     req.token = jsonwebToken.sign({id: resultUser[0].user_id}, constance.sign)
//                     next()
//                 });
//
//                 console.log("UPDATE",resultUser[0] )
//             }else {
//
//                 console.log("INSERT")
//
//                         let registerInfo = {
//                             noti_token: req.body.noti_token,
//                             cate: req.body.cate,
//                             email: req.body.facebook_email,
//
//                         }
//                         db.query("INSERT INTO user_information (noti_token,cate,email) VALUES\
//            ('" + registerInfo.noti_token + "','" + registerInfo.cate + "','"+ registerInfo.email +"' )", function (err, result) {
//                             if (err) throw err;
//                             req.token = jsonwebToken.sign({id: result.insertId}, constance.sign)
//                             next()
//                         })
//
//
//
//
//             }
//         })
//
//
//
//     }
// }
//
//
exports.user_login = function () {
    return function (req, res, next) {

        db.query(`SELECT  user_id ,password ,user_type FROM user_information WHERE email = '${req.body.email}'`, function (err, resultUser) {
            if (err) throw err;

            if (resultUser[0]) {

                let password = resultUser[0].password

                if(bcrypt.compareSync( req.body.password,password)){
                        req.token = jsonwebToken.sign({id: resultUser[0].user_id , type:resultUser[0].user_type}, constance.sign)
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

exports.get_user = function () {
    return function (req, res, next) {
        db.query(`SELECT  name ,last_name ,address,phone_number FROM user_information WHERE user_id = '${req.body.user_id}'`, function (err, resultUser) {
            if (err) throw err;
            if (resultUser[0]) {
                req.result =  resultUser[0]
                next()
            } else {
                res.status(200).json(errorMessages.err_user_invalid)
            }
        })
    }
}
//
//
//
// exports.user_check_email = function () {
//     return function (req, res, next) {
//
//         db.query('SELECT noti_token, user_id ,password FROM user_information WHERE email = \'' + req.body.email + '\'', function (err, resultUser) {
//             if (err) throw err;
//             console.log(resultUser[0])
//             if (typeof resultUser[0] !== 'undefined') {
//                 res.status(200).json(errorMessages.err_email_already)
//             } else {
//                 next()
//             }
//         })
//     }
// }
//
//
//
// exports.user_loout = function () {
//     return function (req, res, next) {
//         let id = req.user_id
//         db.query('UPDATE user_information SET noti_token = "" WHERE user_id = \'' +id+ '\'', function (err, resultUser) {
//             if (err) throw err;
//             next();
//         })
//     }
// }
//
//
//
// exports.user_update = function () {
//     return function (req, res, next) {
//         let registerInfo ={
//             cate :  req.body.cate,
//         }
//         db.query("UPDATE user_information SET cate = '" + registerInfo.cate + "' WHERE user_id = "+req.user_id  , function (err, result) {
//             if (err) throw err;
//                 next()
//         })
//     }
// }
//
//
//
// exports.get_cate = function () {
//     return function (req, res, next) {
//         console.log(req.user_id )
//         db.query('SELECT cate FROM user_information WHERE user_id = \'' + req.user_id + '\'', function (err, result) {
//             if (err) throw err;
//
//             console.log(result[0])
//             if(result[0]){
//                 console.log(result[0].cate)
//                 req.cate = result[0].cate
//                 next()
//
//             }else{
//                 res.status(200).json(errorMessages.err_user_invalid)
//             }
//         })
//     }
// }
//
exports.get_all_user = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM user_information', function (err, result) {
            if (err) throw err;
            req.user_result = result
            next()

        })
    }
}