var express = require('express');
var router = express.Router();

const product_model = require('../models/productModel');

const auth = require("../middleware/auth");

//Lay danh sach playlist (Da xong)
//http://localhost:3000/product/get-products
router.get('/get-products', [auth.checkToken], async function (req, res, next) {
    try {
        const products = await product_model.find({});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: products });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lay chi tiet product theo id
//http://localhost:3000/product/chi-tiet-product
router.get('/chi-tiet-product', [auth.checkToken], async function (req, res, next) {
    try {
        const product = await product_model.findOne({'_id': req.body.product._id});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: product });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lay products theo playlistid
//http://localhost:3000/product/get-products-theo-playlistid

router.post('/get-products-theo-playlistid', [auth.checkToken], async function (req, res, next) {
    try {
        const products = await product_model.find({'playlistId': req.body.playlistId});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: products });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lay products theo userid 
//http://localhost:3000/product/get-products-theo-userid
router.post('/get-products-theo-userid', [auth.checkToken], async function (req, res, next) {
    try {
        const products = await product_model.find({'userId': req.body.userId});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: products });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Them moi product (Da xong)
//http://localhost:3000/product/them-moi-product
router.post('/them-moi-product', [auth.checkToken], async function (req, res, next) {
    try {
        const product = await product_model.findOne({ 'name': req.body.name });
        if (product == null) {
            const product = new product_model(req.body);
            await product.save();
            res.json({ error: false, responeTime: new Date(), statusCode: 200, data: product });
        }else{
            res.json({ error: true, responeTime: new Date(), statusCode: 200, message: 'playlist already exists' });
        }      
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cap nhat product
//http://localhost:3000/product/cap-nhat-product/:id
router.patch('/cap-nhat-product/:id', [auth.checkToken], async function (req, res, next) {
    try {
        await product_model.findByIdAndUpdate(req.params.id, req.body);
        const product = await product_model.findById(req.params.id);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: product });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 200, message: error.message });
    }
});

//Xoa product
//http://localhost:3000/playlist/xoa-product/:id
router.delete('/xoa-product/:id', [auth.checkToken], async function (req, res, next) {
    try {
        await product_model.findByIdAndDelete(req.params.id, req.body);
        const product = await product_model.findById(req.params.id);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: product });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;