let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let moment = require('moment-timezone')
const sharp = require('sharp');

exports.get_banner = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM banner_table', function (err, result) {
            if (err) throw err;
            if (result[0]) {
                let cate = JSON.parse(req.cate)
                let banner = [];
                for (let i = 0; i < result.length; i++) {
                    let cate_query = JSON.parse(result[i].cate)
                    if ((cate.less20000 && cate_query.less20000 === cate.less20000)
                        || (cate.less50000 && cate_query.less50000 === cate.less50000)
                        || (cate.less100000 && cate_query.less100000 === cate.less100000)
                        || (cate.more100000 && cate_query.more100000 === cate.more100000)
                        || (cate.less20_percent && cate_query.less20_percent === cate.less20_percent)
                        || (cate.more20_percent && cate_query.more20_percent === cate.more20_percent)) {
                            banner.push(result[i])
                    }
                }
                req.result = banner;
                next()
            } else {
                req.result = [],
                    next()
            }
        });
    }
}

exports.get_banner_from_admin = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM banner_table', function (err, result) {
            if (err) throw err;
            req.result = result;
            next()
        });
    }
}

exports.update_banner = function () {
    return function (req, res, next) {
        db.query('UPDATE banner_table\
        SET cate = \'' + req.body.cate + '\'\
        ,update_at = \'' + moment.tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss") + '\'\
        WHERE banner_id = \'' + req.body.banner_id + '\'', function (err, result) {
                if (err) throw err;
                if (result) {
                    // console.log(req.body.banner)
                    if (req.body.banner && req.body.banner !== ""){
                        sharp.cache(false);
                        require("fs").writeFile( "./banner/"+ req.body.banner_id + 'a.png', req.body.banner, 'base64', function(err) {
                            sharp( "./banner/"+ req.body.banner_id +"a.png")
                            .resize(640,160)
                            .toFile("./banner/"+ req.body.banner_id +".png", (err, info) => { 
                                // console.log(err)
                                // console.log(info)
                                require("fs").unlinkSync( "./banner/"+ req.body.banner_id  +"a.png")
                                next()})
                          });
                      
                    }else{
                        next();
                    }
                } else {
                    res.status(200).json(errorMessages.err_database)
                }
            })
       
       
    }
}

