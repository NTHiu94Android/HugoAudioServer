var express = require('express');
var router = express.Router();

const playlist_product_model = require('../models/playlistProductModel');

const auth = require("../middleware/auth");

const add_playlist_product = async function (req, res, next) {
  const playlist_product = new playlist_product_model({
    'playlistId': req.body.playlistId,
    'productId': req.body.productId,
    'creationDate': req.body.creationDate
  });
  await playlist_product.save();
  res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist_product });
};

// Lay danh sach playlist-product
// [GET] http://localhost:3000/playlistproduct/get-all-playlist-product
router.get('/get-all-playlist-product', [auth.checkToken], async function (req, res, next) {
  try {
    const playlist_products = await playlist_product_model.find({});
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist_products });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Lay danh sach playlist-product theo playlistid
// [POST] http://localhost:3000/playlistproduct/get-all-playlist-product-theo-playlistid
router.post('/get-all-playlist-product-theo-playlistid', [auth.checkToken], async function (req, res, next) {
  try {
    const playlist_products = await playlist_product_model.find({ 'playlistId': req.body.playlistId });
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist_products });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

// Them product vao playlist
// [POST] http://localhost:3000/playlistproduct/them-product-vao-playlist
router.post('/them-product-vao-playlist', async function (req, res, next) {
  try {
    //Lay danh sach playlist_product
    const playlist_products = await playlist_product_model.find({});
    //Kiem tra playlistId va productId co trung khong
    if (playlist_products != null) {
      let count = 0;
      for (let index = 0; index < playlist_products.length; index++) {
        const playlist_product = playlist_products[index];
        if (playlist_product.playlistId == req.body.playlistId && playlist_product.productId == req.body.productId) {
          count++;
          res.json({ error: false, responeTime: new Date(), statusCode: 200, message: 'Playlist_product already exist' });
          return;
        }
      }
      //Neu khong trung thi tao moi playlist_product
      if (count == 0) {
        await add_playlist_product(req, res, next);
      }
    } else {
      if (count == 0) {
        await add_playlist_product(req, res, next);
      }
    }
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

// Xoa product khoi playlist
// [DELETE] http://localhost:3000/playlistproduct/xoa-product-khoi-playlist/:id
router.delete('/xoa-product-khoi-playlist/:id', async function (req, res, next) {
  try {
    await playlist_product_model.findByIdAndDelete(req.params.id, req.body);
    const playlist_product = await playlist_product_model.findOne(req.params.id);
    res.json({ error: false, responeTime: new Date(), statusCode: 200, message: playlist_product });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

module.exports = router;
