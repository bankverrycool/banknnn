const express = require('express')
const router = express.Router()
const bannerUtils = require('../controller/banner_controller')
const validateUtil = require('../controller/validate_controller')
const userUtil = require('../controller/user_controller')

router.get('/get_banner',
    validateUtil.validate_token(),
    userUtil.get_cate(),
    bannerUtils.get_banner(),
    function (req, res) {
        res.status(200).json({ 'success': true, result: req.result })
    })

router.get('/get_banner_from_admin',
    validateUtil.validate_token_admin(),
    bannerUtils.get_banner_from_admin(),
    function (req, res) {
        res.status(200).json({ 'success': true, result: req.result })
    })


router.post('/update_banner',
    validateUtil.validate_token_admin(),
    bannerUtils.update_banner(),
    function (req, res) {
        res.status(200).json({ 'success': true, message: 'แก้ไข banner สำเร็จ' })
    })


router.get('/image/:id',
    validateUtil.validate_user_and_admin(),
    function (req, res) {
        require("fs").readFile(__dirname.replace("/routes", "") + '/banner/' + req.params.id, (err, data)=>{
                let extensionName = __dirname.replace("/routes", "") + '/banner/' + req.params.id
                let base64Image = new Buffer(data, 'binary').toString('base64');
                let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
                // console.log("file", imgSrcString)
                res.sendFile(__dirname.replace("/routes", "") + '/banner/' + req.params.id)
            
        })
    //     res.sendFile(__dirname.replace("/routes", "") + '/image/' + req.params.id, function (err) {
    //         if (err) {
    //             res.sendFile(__dirname.replace("/routes", "") + '/image/default.png');
    //         }
    // })
})


module.exports = router