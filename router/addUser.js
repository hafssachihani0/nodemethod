const express=require('express');
const router= express.Router();
const usercontroller=require("../Controller/usercontroller")
//date
var moment = require('moment');

const User = require("../models/customerschema");


router.get('/user/add.html', usercontroller.user_add_get);
////////////////Post
router.post('/user/add.html',usercontroller.user_post);
module.exports=router;