const express = require('express')
const router = express.Router()
const newsUtils = require('../controller/news_controller')
const userUtil = require('../controller/user_controller')
const validateUtil = require('../controller/validate_controller')
const emailUtils = require('../controller/land_controller')



router.get('/get_email_admin',
    validateUtil.validate_token_admin(),
    emailUtils.get_all_email(),
    function (req, res) {
        res.status(200).json({ 'success': true, result: req.result })
    })

router.get('/download_email',
    validateUtil.validate_token_admin(),
    emailUtils.download_email())



module.exports = router