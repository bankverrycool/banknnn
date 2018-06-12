let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constanc = require('../const/constance')
const json2csv = require('json2csv').parse;


exports.get_all_email = function () {
    return function (req, res, next) {
        db.query('SELECT user_id ,email FROM user_information ORDER BY user_id ASC', function (err, result) {
            if (err) throw err;
            req.result = result
            next()
        })
    }
}

exports.download_email = function () {
    return function (req, res, next) {
        db.query('SELECT email FROM user_information ORDER BY user_id ASC', function (err, result) {
            if (err) throw err;
            var data = json2csv(result);
            res.setHeader('Content-disposition', 'attachment; filename=email.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(data);
        })
    }
}