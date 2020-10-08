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
    image : String,
    description: String
});

var Campground =mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"poo",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKsDZeWRMfYc-n3IuVeSYXeP01u779z0ezVw&usqp=CAU",
//         description:"She is very innocent and very active"
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
            res.render("index" , {campgrounds:allCampgrounds}); 
        }
    })

    
});

app.post("/campgrounds", function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    var newCapmground = {name: name, image: image ,description:desc };
    
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
});

app.get("/campgrounds/:id" , function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
 
         res.render("show", {campground: foundCampground});
    
        }
    });
    
});

app.listen(3000, function(){
    console.log("DreamCamp Server Has Started");
});