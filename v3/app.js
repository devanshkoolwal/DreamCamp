var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds"); 
    



mongoose.connect("mongodb://localhost:27017/dream_camp",{ useNewUrlParser: true,useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine" , "ejs");  

seedDB();



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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
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