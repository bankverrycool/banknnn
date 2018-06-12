const express = require('express')
const router = express.Router()
const adminUtil = require('../controller/admin_controller')
const validateUtil = require('../controller/validate_controller')


router.post('/admin_login',
validateUtil.validate_admin_login(),
adminUtil.admin_login(),
    function (req, res) {
        res.status(200).json({ 'success': true, token: req.token, message:'ลงชื่อเข้าใช้สำเร็จ' })
    })


router.post('/check_admin',
    validateUtil.validate_token_admin(),
    adminUtil.check_admin(),
    function (req, res) {
        res.status(200).json({ 'success': true, token: req.token, admin:req.admin })
    })

module.exports = router