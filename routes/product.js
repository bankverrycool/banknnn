const express = require('express')
const router = express.Router()
const productUtils = require('../controller/product_controller')
const validateUtil = require('../controller/validate_controller')


router.get('/get_product',
    productUtils.get_product(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    })

router.get('/image/:id',
    function (req, res) {


        require("fs").readFile(__dirname.replace("routes", "") + 'image/product/' + req.params.id, (err, data) => {
            res.sendFile(__dirname.replace("routes", "") + 'image/product/' + req.params.id)

        })
    })

module.exports = router