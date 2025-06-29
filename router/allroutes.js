const express=require('express');
const router= express.Router();
//date
var moment = require('moment');
const User = require("../models/customerschema");
const usercontroller=require("../Controller/usercontroller");

//get all user dans un tableau 
router.get('/',usercontroller.user_index_get )


//show page edit
router.get('/edit/:id', usercontroller.user_edit_get);


// view button show info user
router.get('/view/:id', usercontroller.user_view_get)

//barre recherche 
router.post("/search",usercontroller.user_search_post);

//put
router.delete("/edit/:id", usercontroller.user_delete);


router.put("/edit/:id", usercontroller.user_put);




module.exports=router


