const express = require('express')
const router = express.Router()
const newsUtils = require('../controller/news_controller')
const userUtil = require('../controller/user_controller')
const validateUtil = require('../controller/validate_controller')
const notiUtils = require('../controller/notification_controller')

router.post('/update_news',
    validateUtil.validate_token_admin(),
    newsUtils.update_news(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: 'แก้ไขข่าวสารสำเร็จ'
        })
    })


router.post('/delete_news',
    validateUtil.validate_token_admin(),
    newsUtils.delete_news(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: 'ลบข่าวสารสำเร็จ'
        })
    })


router.post('/create_news',
    validateUtil.validate_token_admin(),
    validateUtil.validate_create_news(),
    newsUtils.create_news(),
    userUtil.get_all_cate(),
    notiUtils.notification(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: 'สร้างข่าวสารสำเร็จ'
        })
    })


router.get('/get_news',
    validateUtil.validate_token(),
    userUtil.get_cate(),
    newsUtils.get_news(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.get('/get_news_admin',
    validateUtil.validate_token_admin(),
    newsUtils.get_all_news(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.post('/get_news_from_id_cate_admin',
    validateUtil.validate_token_admin(),
    newsUtils.get_news_from_id_cate_admin(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.post('/get_news_from_id_cate',
    validateUtil.validate_token(),
    userUtil.get_cate(),
    newsUtils.get_news_from_id_cate(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.get('/get_content_news/:id',
    newsUtils.get_content_news(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })


router.get('/image/:id',
    function (req, res) {
        require("fs").readFile(__dirname.replace("/routes", "") + '/news/' + req.params.id, (err, data) => {
            // let extensionName = __dirname.replace("/routes", "") + '/news/' + req.params.id
            // let base64Image = new Buffer(data, 'binary').toString('base64');
            // let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
            // console.log("file", imgSrcString)
            res.sendFile(__dirname.replace("/routes", "") + '/news/' + req.params.id)

        })
        //     res.sendFile(__dirname.replace("/routes", "") + '/image/' + req.params.id, function (err) {
        //         if (err) {
        //             res.sendFile(__dirname.replace("/routes", "") + '/image/default.png');
        //         }
        // })
    })


module.exports = router