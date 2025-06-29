const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');


app.set("view engine", "ejs");
app.use(express.static('public'));

//override delete
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const allroutes=require('./router/allroutes');
const addUserRoute=require('./router/addUser');



app.use(allroutes);
app.use(addUserRoute);

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




