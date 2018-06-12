let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')


exports.get_product = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM product', function (err, result) {
            if (err) throw err;
            req.result = result;
            next();
            
          })
    }
}
//
// exports.create_category = function () {
//     return function (req, res, next) {
//         db.query("INSERT INTO category_table (category_name) VALUES\
//         ('" + req.body.category_name + "')", function (err, result) {
//                 if (err) throw err;
//                 next()
//             })
//     }
// }
//
//
// exports.delete_category = function () {
//     return function (req, res, next) {
//         //DELETE FROM `itirich`.`news_table` WHERE `category_id`='16';
//         //DELETE FROM `itirich`.`category_table` WHERE `id_category`='4';
//         console.log(req.body.category_id)
//         db.query("SELECT news_id FROM news_table WHERE category_id = '"+req.body.category_id+"'  ", function (err, result) {
//             if (err) throw err;
//
//             result.map( function (element,index) {
//
//                 require("fs").unlinkSync( "./news/"+ element.news_id + '.png' )
//
//             })
//             db.query("DELETE FROM news_table WHERE category_id = '"+req.body.category_id+"' ")
//
//             db.query("DELETE FROM category_table WHERE id_category = '"+req.body.category_id+"'  ", function (err, result) {
//                 if (err) throw err;
//                 next()
//             })
//         })
//     }
// }
//
//
//
// exports.update_category = function () {
//     return function (req, res, next) {
//         console.log(req.body.category_name)
//         db.query("UPDATE category_table SET category_name = '"+req.body.category_name+"' WHERE  id_category = '"+req.body.id_category+"'  ", function (err, result) {
//             if (err) throw err;
//             next()
//         })
//     }
// }
//
