var express = require('express');
var router = express.Router();

const playlist_model = require('../models/playlistModel');

//Lay danh sach playlist (Da xong)
//http://localhost:3000/playlist/get-playlist
router.get('/get-playlist', async function (req, res, next) {
    try {
        const playlists = await playlist_model.find({});
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlists });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Them moi playlist (Da xong)
//http://localhost:3000/playlist/them-moi-playlist
router.post('/them-moi-playlist', async function (req, res, next) {
    try {
        const playlistFavorite = await playlist_model.findOne({'name' : 'My favorite'});
        const playlist = await playlist_model.findOne({ 'name': req.body.name });
        if (playlist == null) {
            const playlist = new playlist_model({'name' : req.body.name, 'userId': playlistFavorite.userId, 'playlistType': 1});
            await playlist.save();
            res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist });
        }else{
            res.json({ error: true, responeTime: new Date(), statusCode: 200, message: 'playlist already exists' });
        }      
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cap nhat playlist
//http://localhost:3000/playlist/cap-nhat-playlist/:id
router.patch('/cap-nhat-playlist/:id', async function (req, res, next) {
    try {
        const playlist = await playlist_model.findByIdAndUpdate(req.params.id, req.body);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Xoa playlist
//http://localhost:3000/playlist/xoa-playlist/:id
router.delete('/xoa-playlist/:id', async function (req, res, next) {
    try {
        const playlist = await playlist_model.findByIdAndDelete(req.params.id, req.body);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: playlist });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;