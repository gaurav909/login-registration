const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const express = require("express");

const multer = require("multer");

const path = require("path");

const router = express.Router();

const User = require("../models/user");

const Token = require("../models/token");

const SECRET_KEY = "bgtery";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.post("/uploadimage", upload.single("profile_pic"), (req, res) => {
  res.json({ msg: "File uploaded successfully" });
});

//http:localhost:

router.post("/adduser", async (req, res) => {
  try {
    const newUser = new User({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      // user_dob: bcrypt.hashSync(req.body.user_dob, 12),
      user_dob: req.body.user_dob,
      gender: req.body.gender,
      password: await bcrypt.hash(req.body.password, 12),
    });

    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// http://localhost:5000/api/user/userlogin
router.post("/userlogin", async (req, res) => {
  const email = req.body.user_email;
  const password = req.body.password;

  try {
    const login = await User.findOne({ user_email: email });
    if (!login) {
      return res.json({ sts: 1, msg: " Email not found" });
    } else {
      if (await bcrypt.compare(password, login.password)) {
        const token = jwt.sign({ userid: login._id }, SECRET_KEY, {
          expiresIn: "1hr",
        });
        const expireAt = new Date(Date.now() + 60 * 60 * 1000);

        const tokenSave = new Token({
          userId: login._id,
          token,
          expireAt,
        });

        const uname = login.user_name;
        await tokenSave.save();
        return res.json({
          sts: 0,
          msg: " login success",
          user_name: uname,
          token,
        });
      } else {
        return res.json({ sts: 2, msg: "password is wrong" });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

// http://localhost:5000/api/user/checktoken

router.post("/checktoken", async (req, res) => {
  const token = req.body.token;

  try {
    const tokenchk = await Token.findOne({ token });
    if (!tokenchk) {
      return res.json({ toknests: 1 });
    } else {
      return res.json({ toknests: 0 });
    }
  } catch (error) {
    console.error(error);
  }
});


// http://localhost:5000/api/user/logout
router.post('/logout',async(req,res)=>{


  const token = req.body.token

  try {

    const logout = await Token.findOneAndDelete({token})
    if(!logout){
      return res.json({'logout_sts':1})
    }else{
      return res.json({'logout_sts':0})
    }
    
  } catch (error) {
    console.error(error)
  }
})

router.get("/viewuser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

router.get("/singleuser/:userid", async (req, res) => {
  const uid = req.params.userid;

  try {
    const users = await User.findById(uid);
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

router.put("/updateuser/:userid", async (req, res) => {
  const uid = req.params.userid;

  try {
    const users = await User.findByIdAndUpdate(
      uid,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

router.delete("/deleteuser/:userid", async (req, res) => {
  const uid = req.params.userid;

  try {
    const users = await User.findByIdAndDelete(uid);
    res.status(200).json({ msg: "user has successfully deleted", sts: "1" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});
module.exports = router;
