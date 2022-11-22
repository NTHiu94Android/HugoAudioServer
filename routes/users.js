var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const userModel = require('../models/userModel');
const playlistModel = require('../models/playlistModel');

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
      if(await bcrypt.compare(req.body.password, user.password)){
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '900s' }
        );
        res.json({ error: false, responeTime: new Date(), statusCode: 200, accessToken: token, data: user});
      }else{
        res.status(422).json({ error: true, responeTime: new Date(), statusCode: 422, message: 'Invalid password' });
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
router.post('/dang-ky', upload.single("image"), async function (req, res, next) {
  try {
    const user = await userModel.findOne({ 'username': req.body.username });
    if (user == null) {
      //Tao moi user
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const numberPhone = req.body.numberPhone;
      const birthDay = req.body.birthDay;
      const gender = req.body.gender;
      const userType = req.body.userType;
      const image = req.body.image;

      // if(!req.file){
      //   console.log(req.file);
      //   const result = await cloudinary.uploader.upload(req.file.path);
      //   image = result.secure_url;
      // }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const us = new userModel({ username, password: hash, email, numberPhone, birthDay, gender, userType, image });
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
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    const us = await userModel.findById(req.params.id);
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: us });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

//Xoa user
//http://localhost:3000/users/xoa/:id
router.delete('/xoa/:id', async function (req, res, next) {
  try {
    await userModel.findByIdAndDelete(req.params.id, req.body);
    const us = await userModel.findById(req.params.id);
    res.json({ error: false, responeTime: new Date(), statusCode: 200, data: us });
  } catch (error) {
    res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
  }
});

module.exports = router;
