var express = require('express');
var router = express.Router();

const album_model = require('../models/albumModel');
const product_model = require('../models/productModel');

const auth = require("../middleware/auth");

//Lay danh sach album (Da xong)
//http://localhost:3000/album/get-album
router.get('/get-album', [auth.checkToken], async function (req, res, next) {
    try {
        const albums = await album_model.find({});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: albums });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lay danh sach album theo userid(Da xong)
//http://localhost:3000/album/get-albums-theo-userid
router.post('/get-albums-theo-userid', [auth.checkToken], async function (req, res, next) {
    try {
        const albums = await album_model.find({'userId': req.body.userId});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: albums });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Them moi album (Da xong)
//http://localhost:3000/album/them-moi-album
router.post('/them-moi-album', [auth.checkToken], async function (req, res, next) {
    try {
        const album = await album_model.findOne({ 'name': req.body.name });
        if (album == null) {
            const album = new album_model(req.body);
            await album.save();
            res.json({ error: false, responeTime: new Date(), statusCode: 200, data: album });
        } else {
            res.json({ error: true, responeTime: new Date(), statusCode: 200, message: 'playlist already exists' });
        }
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cap nhat album
//http://localhost:3000/album/cap-nhat-album/:id
router.patch('/cap-nhat-album/:id', [auth.checkToken], async function (req, res, next) {
    try {
        await album_model.findByIdAndUpdate(req.params.id, req.body);
        const album = await album_model.findById(req.params.id);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: album });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 200, message: error.message });
    }
});

//Xoa album
//http://localhost:3000/album/xoa-album/:id
router.delete('/xoa-album/:id', [auth.checkToken], async function (req, res, next) {
    try {
        await album_model.findByIdAndDelete(req.params.id, req.body);
        const album = await album_model.findById(req.params.id);
        //Xoa album xoa luon product trong album
        const products = await product_model.find({ 'albumId': album._id });
        for (let index = 0; index < products.length; index++) {
            const playlist_id = products[index]._id;
            await product_model.findByIdAndDelete(playlist_id);
        }
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: album });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;