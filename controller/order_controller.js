let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constanc = require('../const/constance')

exports.get_land_order = function () {
    return function (req,res,next) {
        db.query(`SELECT user_id FROM user_information WHERE user_id = '${req.user_id}'`,function (err,resultUser) {
            if (err) throw err;

            if(resultUser[0]){

                let landInfo = {
                    user_id : resultUser[0].user_id,
                    land_id: req.body.land_id,
                }
                db.query(`SELECT 
                land_order.order_id as order_id ,
                 land_order.payment_status as payment_status,
                  land_order.user_id as user_id ,  
                  land_order.land_id as land_id ,
                  land_announce.price as price ,
                  land_information.area as area,
                  land_order.payment_image as payment_image
                  FROM land_order INNER JOIN land_information ON land_order.land_id = land_information.land_id INNER JOIN land_announce ON land_announce.announce_id = land_information.announce_id WHERE land_order.user_id=${landInfo.user_id}  ORDER BY land_order.order_id DESC`,function (err,resultOrder) {
                    if (err) throw err;
                    res.result = resultOrder
                    next()

                })


            }else{

                res.status(200).json(errorMessages.err_basic_auth)
            }

        })
    }
}

exports.get_land_order_admin = function () {
    return function (req,res,next) {
                db.query(`SELECT
                land_order.order_id as order_id ,
                 land_order.payment_status as payment_status,
                  land_order.user_id as user_id ,  
                  land_order.land_id as land_id ,
                  land_announce.price as price ,
                  land_information.area as area,
                  land_order.payment_image as payment_image
                FROM land_order INNER JOIN land_information ON land_order.land_id = land_information.land_id INNER JOIN land_announce ON land_announce.announce_id = land_information.announce_id ORDER BY land_order.order_id DESC `,function (err,resultOrder) {
                    if (err) throw err;
                    res.result = resultOrder
                    next()

                })
    }
}




exports.user_confirm_payment = function () {

    return function (req,res,next) {
        db.query(`SELECT user_id FROM user_information WHERE user_id = '${req.user_id}'`,function (err,resultUser) {
            if (err) throw err;

            if(resultUser[0]){

                let paymentInfo = {
                    user_id : resultUser[0].user_id,
                    land_id: req.body.land_id,
                    order_id:req.body.order_id,
                }
                let payment_image = req.body.payment_image.slice(req.body.payment_image.indexOf(',')+1)
                require("fs").writeFile( "./image/payment/payment-"+ paymentInfo.order_id + '.png', payment_image, 'base64', function(err) {
                    if (err) throw err;
                    db.query(`UPDATE land_order SET payment_image = 'order/image/payment-${paymentInfo.order_id}.png' ,payment_status=1 WHERE order_id = ${paymentInfo.order_id}`, function (err, result) {
                        if (err) throw err;
                        next()
                    });

                });
            }else{

                res.status(200).json(errorMessages.err_basic_auth)
            }

        })
    }
}

exports.admin_confirm_payment = function () {

    return function (req,res,next) {
        let paymentInfo = {
                    order_id:req.body.order_id,
                    land_id:req.body.land_id,
                    user_id:req.body.user_id
        }
        db.query(`UPDATE land_order SET payment_status=2 WHERE order_id = ${paymentInfo.order_id}`, function (err, result) {
            if (err) throw err;
            db.query(`UPDATE land_information SET rent_user_id = ${paymentInfo.user_id} WHERE land_id = ${paymentInfo.land_id} `,function (err,res) {
                if (err) throw err;
                next()
            })

        });

    }
}