var express = require("express");
var router = express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware = require("../middleware");


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

router.post("/", middleware.isLoggedIn,function(req,res){
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

router.get("/new", middleware.isLoggedIn,function(req,res){
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


router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
            
        });
});

router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds/"+req.params.id)
    })
});

router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       
            res.redirect("/campgrounds");
    })
})



module.exports = router;


