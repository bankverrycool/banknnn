const express = require('express')
const router = express.Router()
const newsUtils = require('../controller/news_controller')
const userUtil = require('../controller/user_controller')
const validateUtil = require('../controller/validate_controller')
const landUtils = require('../controller/land_controller')
const ip = require('../const/constance')



router.get('/get_land_list',
    landUtils.get_land_list(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })


// router.post('/get_land_information',
//     validateUtil.validate_get_land(),
//     landUtils.get_land(),
//     function (req, res) {
//         res.status(200).json({ 'success': true, result: req.result })
// })


router.post('/get_land_information',
    validateUtil.validate_get_land(),
    landUtils.get_land(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.post('/insert_land_order',
    validateUtil.validate_token(),
    landUtils.insert_land_order(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "บันทึกรายการเรียบร้อยแล้ว"
        })
    })


router.get('/get_land_user',
    validateUtil.validate_token(),
    landUtils.get_land_user(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })





router.get('/image/:id',
    function (req, res) {
        require("fs").readFile(__dirname.replace("routes", "") + 'image/land/' + req.params.id, (err, data) => {
            res.sendFile(__dirname.replace("routes", "") + 'image/land/' + req.params.id)

        })
    })





module.exports = router