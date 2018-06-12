const express = require('express')
const router = express.Router()
const newsUtils = require('../controller/news_controller')
const userUtil = require('../controller/user_controller')
const validateUtil = require('../controller/validate_controller')
const orderUtils = require('../controller/order_controller')
const ip = require('../const/constance')




router.get('/get_land_order',
    validateUtil.validate_token(),
    orderUtils.get_land_order(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: res.result
        })
    })

router.get('/get_land_order_admin',
    validateUtil.validate_token_admin(),
    orderUtils.get_land_order_admin(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: res.result
        })
    })

router.post('/user_confirm_payment',
    validateUtil.validate_token(),
    validateUtil.validate_user_confirm_payment(),
    orderUtils.user_confirm_payment(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ส่งรายการยืนยันการชำระเรียบร้อยแล้ว"
        })
    })

router.post('/admin_confirm_payment',
    validateUtil.validate_token_admin(),
    validateUtil.validate_admin_confirm_payment(),
    orderUtils.admin_confirm_payment(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ส่งรายการยืนยันการชำระเรียบร้อยแล้ว"
        })
    })


router.get('/image/:id',
    function (req, res) {
        require("fs").readFile(__dirname.replace("routes", "") + 'image/payment/' + req.params.id, (err, data) => {
            res.sendFile(__dirname.replace("routes", "") + 'image/payment/' + req.params.id)

        })
    })





module.exports = router