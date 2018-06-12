const express = require('express')
const router = express.Router()
const categoryUtils = require('../controller/category_controller')
const validateUtil = require('../controller/validate_controller')


router.get('/get_category',
    categoryUtils.get_category(),
    function (req, res) {
        res.status(200).json({ 'success': true, result: req.result })
    })

router.post('/insert_category',
    validateUtil.validate_token_admin(),
    categoryUtils.create_category(),
    function (req, res) {
        res.status(200).json({ 'success': true, message:"สร้างหมวดหมู่สำเร็จ"})
    })

router.post('/update_category',
    validateUtil.validate_token_admin(),
    categoryUtils.update_category(),
    function (req, res) {
        res.status(200).json({ 'success': true, message:"แก้ไขหมวดหมู่สำเร็จ"})
    })


router.post('/delete_category',
    validateUtil.validate_token_admin(),
    categoryUtils.delete_category(),
    function (req, res) {
        res.status(200).json({ 'success': true, message:"ลบหมวดหมู่สำเร็จ"})
    })


module.exports = router