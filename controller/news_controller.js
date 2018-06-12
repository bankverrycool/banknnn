let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constanc = require('../const/constance')
// const sharp = require('sharp');



exports.create_news = function () {
    return function (req, res, next) {
        let newsInfo = {
            title: req.body.title,
            detail: req.body.detail,
            url_video: req.body.url_video,
            cate: req.body.cate,
            category_id: req.body.category_id
        }
        db.query("INSERT INTO news_table (title,detail,url_image, url_video, category_id ,admin_create_id,cate) VALUES\
        ('"+ newsInfo.title + "', '" + newsInfo.detail + "', '" + constanc.default_news + "', '"
            + newsInfo.url_video + "', '" + newsInfo.category_id + "', '" + req.admin_id + "', '" + newsInfo.cate + "')", function (err, resultInsert) {
                if (err) throw err;
                if (resultInsert){
                    console.log(resultInsert.insertId)
                    if (req.body.news_image && req.body.news_image !== ""){
                        require("fs").writeFile( "./news/"+ resultInsert.insertId + '.png', req.body.news_image, 'base64', function(err) {
                            if (err) throw err;
                            db.query('UPDATE news_table\
                                SET url_image = \'' + constanc.ip +"news/image/" + resultInsert.insertId +".png"  + '\'\
                                WHERE news_id = \'' + resultInsert.insertId + '\'', function (err, result) {
                                    if (err) throw err;
                                    next()
                                });

                          });
                    }else{
                        next();
                    }
                }else{
                    res.status(200).json(errorMessages.err_database)
                }

            })
    }
}

exports.update_news = function () {
    return function (req, res, next) {
        db.query('UPDATE news_table\
        SET title = \'' + req.body.title + '\'\
        , detail = \'' + req.body.detail + '\'\
        , url_video = \'' + req.body.url_video + '\'\
        , cate = \'' + req.body.cate + '\'\
        , category_id = \'' + req.body.category_id + '\'\
        WHERE news_id = \'' + req.body.news_id + '\'', function (err, result) {
                if (err) throw err;
                if (req.body.news_image && req.body.news_image !== ""){
                    require("fs").writeFile( "./news/"+ req.body.news_id + 'a.png', req.body.news_image, 'base64', function(err) {
                        sharp( "./news/"+ req.body.news_id +"a.png")
                        .resize(720,405)
                        .toFile("./news/"+ req.body.news_id +".png", (err, info) => { 
                            require("fs").unlinkSync( "./news/"+ req.body.news_id  +"a.png")
                            next()})
                      });
            
                }else{
                    next();
                }
            });
    }
}

exports.delete_news = function () {
    return function (req, res, next) {
        console.log(req.body.news_id)

        db.query('DELETE FROM news_table WHERE news_id = \'' + req.body.news_id + '\'', function (err, result) {
            if (err) throw err;

            try{
                require("fs").unlinkSync( "./news/"+ req.body.news_id + '.png' )
            }catch(err){
                console.log(err)
            }
                    next();
        });
    }
}





exports.get_news = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM news_table ORDER BY create_at DESC', function (err, result) {
            if (err) throw err;
            if (result[0]) {
                console.log(req.cate)
                let cate = JSON.parse(req.cate)
                let news = [];
                for (let i = 0; i < result.length; i++) {
                    let cate_query = JSON.parse(result[i].cate)
                    if ((cate.less20000 && cate_query.less20000 === cate.less20000)
                        || (cate.less50000 && cate_query.less50000 === cate.less50000)
                        || (cate.less100000 && cate_query.less100000 === cate.less100000)
                        || (cate.more100000 && cate_query.more100000 === cate.more100000)
                        || (cate.less20_percent && cate_query.less20_percent === cate.less20_percent)
                        || (cate.more20_percent && cate_query.more20_percent === cate.more20_percent)) {
                        news.push(result[i])
                    }
                }
                req.result = news;
                next()
            } else {
                req.result = [],
                    next()
            }
        });
    }
}

exports.get_all_news = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM news_table ORDER BY create_at DESC', function (err, result) {
            if (err) throw err;
            req.result = result
            next()
        });
    }
}

exports.get_content_news = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM news_table WHERE news_id = \'' + req.params.id + '\'', function (err, result) {
            if (err) throw err;
            req.result = result;
            next()
        });
    }
}

exports.get_news_from_id_cate_admin = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM news_table WHERE category_id = \'' + req.body.category_id + '\' ORDER BY create_at DESC', function (err, result) {
            if (err) throw err;
            req.result = result;
            next()

        });
    }
}

exports.get_news_from_id_cate = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM news_table WHERE category_id = \'' + req.body.category_id + '\' ORDER BY create_at DESC', function (err, result) {
            if (err) throw err;
            if (result[0]) {
                let cate = JSON.parse(req.cate)
                let news = [];
                for (let i = 0; i < result.length; i++) {
                    let cate_query = JSON.parse(result[i].cate)
                    if ((cate.less20000 && cate_query.less20000 === cate.less20000)
                        || (cate.less50000 && cate_query.less50000 === cate.less50000)
                        || (cate.less100000 && cate_query.less100000 === cate.less100000)
                        || (cate.more100000 && cate_query.more100000 === cate.more100000)
                        || (cate.less20_percent && cate_query.less20_percent === cate.less20_percent)
                        || (cate.more20_percent && cate_query.more20_percent === cate.more20_percent)) {
                        news.push(result[i])
                    }
                }
                req.result = news;
                next()
            } else {
                req.result = [],
                    next()
            }
        });
    }
}