var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var port = 3012;
var version = '/api/v1/';
var logger = require('morgan')
var schedule = require('node-schedule')
var rimraf = require('rimraf')
var fs = require('fs')
var moment = require('moment')


var mm = moment()
var date = mm.utc().format('DD-MM-YYYY')
var time = mm.utc().format('HH: mm: ss')

// // Create application/x-www-form-urlencoded parser
// // app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
//
// // Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
  res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
  next()
});
//
//
// schedule.scheduleJob('59 59 23 * * *', () => {
//   let date = moment().utcOffset('+07:00').format('YYYYMMDD')
//   rimraf(`./public/${date}`, () => console.log(`remove folder: ${date}`))
// })
// schedule.scheduleJob('01 00 00 * * *', () => {
//   let date = moment().utcOffset('+07:00').format('YYYYMMDD')
//   var dir = `./public/${date}`;
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//     console.log(`create folder: ${date}`)
//   }
// })

app.use(logger('dev'))
var accessLogStream = fs.createWriteStream(`${__dirname}/logs/${date}.log`, {flags: 'a'})
var configlog = `[${time}] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`
app.use(logger(configlog, {stream: accessLogStream}))
//
var user = require('./routes/user')
var land = require('./routes/land')
// var admin = require('./routes/admin')
// var news = require('./routes/news')
var product = require('./routes/product')
var order = require('./routes/order')

//
app.use(version + 'user', user)
app.use(version + 'land', land)
app.use(version + 'order', order)
app.use(version + 'product', product)
// app.use(version + 'admin', admin)
// app.use(version + 'news', news)
// app.use(version + 'category', category)
// app.use(version + 'banner', banner)
// app.use(version + 'email', email)
//



var server = app.listen(port, function() {
    console.log('Server is running port: ' + port);
});
