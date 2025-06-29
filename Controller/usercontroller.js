var moment = require('moment');
const User = require("../models/customerschema");




const user_index_get=(req, res) => {
    console.log("-----------------------------------")
    User.find()
        .then((result) => {
            res.render("index", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        })

}

const user_edit_get = (req, res) => {
    // نبحث عن المستخدم في قاعدة البيانات باستخدام الـ id المرسل في الرابط (req.params.id)
    User.findById(req.params.id)
        .then((result) => {
            // إذا وجدناه، نعرض صفحة التعديل (edit.ejs) 
            // ونرسل لها بيانات المستخدم في المتغيّر obj
            // ونرسل أيضاً مكتبة moment لاستعمالها في الفورما (مثلاً لتنسيق التواريخ)
            res.render("user/edit", { obj: result, moment: moment });
        })
        .catch((err) => {
            // إذا وقع خطأ، نطبعه في الكونسول
            console.log(err)
        });
}



const user_view_get=(req, res) => {
    User.findById(req.params.id)
        //result==object
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err)
        })
}

const user_search_post= (req, res) => {
  console.log("*******************************");
 
  const searchText = req.body.searchText.trim();
  console.log("Texte recherché :", searchText);

  User.find({ 
    $or: [
      { firstname: { $regex: searchText, $options: "i" } },
      { lastname: { $regex: searchText, $options: "i" } }
    ] 
  })
    .then((result) => {
      console.log("Résultat trouvé :", result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}


const user_delete=(req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
        res.redirect("/");})
        .catch((err)=>{
            console.log(err)
        })



}

const user_put=(req, res) => {

        User.findByIdAndUpdate(req.params.id,req.body).
        then(()=>{
            res.redirect("/")
        }).catch((err)=>{
            console.log(err)
        })


}

const user_add_get=(req, res) => {
    res.render("user/add")
}


const user_post= (req, res) => {

    const user = new User(req.body);
    user.save()
        .then(() => {

            res.redirect('/')

        })
        .catch((err) => {
            console.log(err)
        })

}

module.exports={user_index_get,user_edit_get,user_view_get,user_search_post,user_delete,user_put,user_add_get,user_post};