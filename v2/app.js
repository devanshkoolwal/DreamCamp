var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");


mongoose.connect("mongodb://localhost:27017/dream_camp",{ useNewUrlParser: true,useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine" , "ejs");  


//schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image : String
});

var Campground =mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"poo",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKsDZeWRMfYc-n3IuVeSYXeP01u779z0ezVw&usqp=CAU"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly added");
//             console.log(campground);
//         }
//     }
// );


app.get("/" , function(req,res){
res.render("landing");
});

app.get("/campgrounds" , function(req,res){
    
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds" , {campgrounds:allCampgrounds}); 
        }
    })

    
});

app.post("/campgrounds", function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var newCapmground = {name: name, image: image};
    
    Campground.create(newCapmground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });

    
});

app.get("/campgrounds/new",function(req,res){
    res.render("new")
})

app.listen(3000, function(){
    console.log("DreamCamp Server Has Started");
});