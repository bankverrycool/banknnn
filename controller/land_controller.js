let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constanc = require('../const/constance')
// const json2csv = require('json2csv').parse;


exports.get_land_list = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM land_announce ORDER BY announce_date DESC ', function (err, result) {
            if (err) throw err;
            req.result = result
            next()
        })
    }
}

exports.get_land = function () {
    return function (req,res,next) {
        db.query(`SELECT land_id,fill,point,area,detail,rent_user_id FROM land_information WHERE announce_id = '${req.body.announce_id}'`,function (err,result) {
            if (err) throw err;
            req.result = result
            next()
        })
    }
}


exports.get_land_user = function () {
    return function (req,res,next) {
        db.query(`SELECT 
         land_information.land_id as land_id,
        land_information.fill as fill,
        land_information.point as point,
        land_information.area as area,
        land_information.detail as detail,
        land_information.rent_user_id as rent_user_id,
        land_announce.land_image as land_image,
        land_announce.image as image,
         land_announce.announce_id as announce_id,
         land_announce.price as price,
         user_information.user_id as user_id,
         user_information.name as name,
         user_information.phone_number as phone_number,
         user_information.last_name as last_name
         FROM land_information INNER JOIN land_announce ON land_information.announce_id = land_announce.announce_id INNER JOIN user_information ON land_announce.user_id = user_information.user_id  WHERE rent_user_id = '${req.user_id}' `,function (err,result) {
            if (err) throw err;
            req.result = result
            next()
        })
    }
}

exports.insert_land_order = function () {
    return function (req,res,next) {
        db.query(`SELECT user_id FROM user_information WHERE user_id = '${req.user_id}'`,function (err,resultUser) {
            if (err) throw err;

            if(resultUser[0]){

                let landInfo = {
                    user_id : resultUser[0].user_id,
                    land_id: req.body.land_id,
                }
                db.query(`SELECT order_id FROM land_order WHERE land_id = ${landInfo.land_id} AND user_id=${landInfo.user_id}`,function (err,resultCheck) {
                    if(resultCheck[0]){
                        res.status(200).json(errorMessages.err_insurance_already)
                    }else{
                        db.query(`INSERT INTO land_order (order_id,land_id,payment_image,payment_status,user_id) VALUES (NULL, '${landInfo.land_id}', '', '0', '${landInfo.user_id}');`,function (err,result) {
                            if (err) throw err;
                            next()
                        })
                    }


                })


            }else{

                res.status(200).json(errorMessages.err_basic_auth)
            }

        })
    }
}




// exports.download_email = function () {
//     return function (req, res, next) {
//         db.query('SELECT email FROM user_information ORDER BY user_id ASC', function (err, result) {
//             if (err) throw err;
//             var data = json2csv(result);
//             res.setHeader('Content-disposition', 'attachment; filename=email.csv');
//             res.set('Content-Type', 'text/csv');
//             res.status(200).send(data);
//         })
//     }
// }