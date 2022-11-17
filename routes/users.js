var express = require('express');
var router = express.Router();

const userModel = require('../models/userModel');
const playlistModel = require('../models/playlistModel');

/* GET users listing. */
//Lay danh sach user (Da xong)
//http://localhost:3000/users/get-user 
router.get('/get-users', async function (req, res, next) {
  try {
    const users = await userModel.find({});
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: users });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Dang nhap (Da xong)
//http://localhost:3000/users/dang-nhap
router.post('/dang-nhap', async function (req, res, next) {
  try {
    const user = await userModel.findOne({ 'username': req.body.username });
    if (user != null) {
      if (user.username == req.body.username && user.password == req.body.password) {
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: user });
      } else {
        res.status(422).json({ error: true, responeTime: new Date(), statusCode: 422, message: 'Invalid username' });
      }
    } else {
      res.status(422).json({ error: true, responeTime: new Date(), statusCode: 422, message: 'Invalid username' });
    }
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Đăng ký user (Da xong)
//http://localhost:3000/users/dang-ky 
router.post('/dang-ky', async function (req, res, next) {
  try {
    const user = await userModel.findOne({ 'username': req.body.username });
    if (user == null) {
      //Tao moi user
      const us = new userModel(req.body);
      await us.save();
      res.json({ error: false, responeTime: new Date(), statusCode: 200, data: us });
      //Tao playlist favorite khi tao user moi
      const playlist = new playlistModel({ 'name': 'My favorite', 'userId': us._id, 'playlistType': 0 });
      await playlist.save();
    } else {
      res.json({ error: true, responeTime: new Date(), statusCode: 200, message: 'Account already exists' });
    }
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Cap nhat user
//http://localhost:3000/users/cap-nhat/:id
router.patch('/cap-nhat/:id', async function (req, res, next) {
  try {
    const us = await userModel.findByIdAndUpdate(req.params.id, req.body);
    if (!us) {
      res.status(404).send('No item found');
      return;
    }
    await userModel.save();
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: us });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Xoa user
//http://localhost:3000/users/xoa/:id
router.delete('/xoa/:id', async function (req, res, next) {
  try {
    const us = await userModel.findByIdAndDelete(req.params.id, req.body);
    if (!us) {
      res.status(404).send('No item found');
      return;
    }
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: us });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

module.exports = router;
