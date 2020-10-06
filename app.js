var express = require("express");
var app = express();

app.set("view engine" , "ejs");  

app.get("/" , function(req,res){
res.render("landing");
});

app.get("/campgrounds" , function(req,res){
    var campgrounds = [
        {name: "vivek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKsDZeWRMfYc-n3IuVeSYXeP01u779z0ezVw&usqp=CAU"},
        {name: "Harika", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM6P6AUP7-CJ3hm20iBT61OIQez2Jpr0n9mw&usqp=CAU"},
        {name: "varshitha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOPQlUSL6rRXFJEV44dNkkc8-G7X_x9abCmw&usqp=CAU"}
    ]
    res.render("campgrounds" , {campgrounds:campgrounds}); 
});


app.listen(3000, function(){
    console.log("DreamCamp Server Has Started");
});