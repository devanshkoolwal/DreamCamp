var express = require("express");
var router = express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");


router.get("/" , function(req,res){
    req.user
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index" , {campgrounds:allCampgrounds}); 
        }
    })

    
});

router.post("/", isLoggedIn,function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username,
    };
    var newCapmground = {name: name, image: image ,description:desc, author:author };
    
    Campground.create(newCapmground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });

    
});

router.get("/new", isLoggedIn,function(req,res){
    res.render("campgrounds/new")
});

router.get("/:id" , function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            
            res.render("campgrounds/show", {campground: foundCampground});
    
        }
    });
    
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;


