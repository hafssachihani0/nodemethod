const express = require("express");
const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');

const User = require("./models/customerschema");
app.set("view engine", "ejs");
app.use(express.static('public'));
//date
var moment = require('moment');
//override delete
var methodOverride = require('method-override')
app.use(methodOverride('_method'))



//get all user dans un tableau 
app.get('/', (req, res) => {
    console.log("-----------------------------------")
    User.find()
        .then((result) => {
            res.render("index", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        })

})


//page add user
app.get('/user/add.html', (req, res) => {
    res.render("user/add")
})

//show page edit
app.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err)
        });
});


// view button show info user
app.get('/view/:id', (req, res) => {
    User.findById(req.params.id)
        //result==object
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err)
        })
})

////////////////Post
app.post('/user/add.html', (req, res) => {
    User.create(req.body)
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })

});



//put
app.delete("/edit/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
        res.redirect("/");})
        .catch((err)=>{
            console.log(err)
        })


})


//put
app.put("/edit/:id", (req, res) => {
   


})


mongoose.connect("mongodb+srv://admin:admin@cluster0.8kubj.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("your data base is connect")
        app.listen(port, () => {
            console.log(`port listen at ${port}`)
        })
    })
    .catch((err) => {
        console.error("failed to connect data base", err)

    });




