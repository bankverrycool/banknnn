const express = require('express')
const router = express.Router()
const userUtil = require('../controller/user_controller')
const validateUtil = require('../controller/validate_controller')

router.post('/user_register',
    validateUtil.validate_user_register(),
    userUtil.user_register(),
    function (req, res) {
        res.status(200).json({ 'success': true, message :"สมัครสมาชิกสำเร็จ" })
    })

router.post('/user_login',
    validateUtil.validate_user_login(),
    userUtil.user_login(),
    function (req,res) {
        res.status(200).json({'success' :true ,token:req.token , message :"เข้าสู่ระบบสำเร็จ"})
    }

)

router.post('/get_user',
    validateUtil.validate_user_id(),
    userUtil.get_user(),
    function (req,res) {
        res.status(200).json({'success' :true ,result:req.result })
    }

)




//
// router.post('/user_check_email',
//     validateUtil.validate_user_check_email(),
//     userUtil.user_check_email(),
//     function (req,res) {
//         res.status(200).json({'success' :true ,message:"สามารถใช้ Email นี้ได้"})
//     }
//
// )
//
// router.post('/user_logout',
//     validateUtil.validate_token(),
//     userUtil.user_loout(),
//     function (req,res) {
//         res.status(200).json({'success' :true ,message:'ออกจากระบบสำเร็จ'})
//     }
//
// )
//
// router.post('/user_update',
//     validateUtil.validate_token(),
//     userUtil.user_update(),
//     function (req,res) {
//         res.status(200).json({'success' :true ,message:'เข้าสู่ระบบสำเร็จ'})
//     }
// )
//
// router.post('/user_facebook_login',
//     validateUtil.validate_facebook_login(),
//     userUtil.user_facebook_login(),
//     function (req,res) {
//         res.status(200).json({'success' :true,token:req.token ,message:'เข้าสู่ระบบสำเร็จ'})
//
//     }
//
// )
//




module.exports = router