var express = require("express");
var app = express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine" , "ejs");  

var campgrounds = [
    {name: "vivek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKsDZeWRMfYc-n3IuVeSYXeP01u779z0ezVw&usqp=CAU"},
    {name: "Harika", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM6P6AUP7-CJ3hm20iBT61OIQez2Jpr0n9mw&usqp=CAU"},
    {name: "varshitha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOPQlUSL6rRXFJEV44dNkkc8-G7X_x9abCmw&usqp=CAU"},
    {name: "vivek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKsDZeWRMfYc-n3IuVeSYXeP01u779z0ezVw&usqp=CAU"},
    {name: "Harika", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM6P6AUP7-CJ3hm20iBT61OIQez2Jpr0n9mw&usqp=CAU"},
    {name: "varshitha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOPQlUSL6rRXFJEV44dNkkc8-G7X_x9abCmw&usqp=CAU"}
];

app.get("/" , function(req,res){
res.render("landing");
});

app.get("/campgrounds" , function(req,res){
    
    res.render("campgrounds" , {campgrounds:campgrounds}); 
});

app.post("/campgrounds", function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var newCapmground = {name: name, image: image};
    campgrounds.push(newCapmground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new")
})

app.listen(3000, function(){
    console.log("DreamCamp Server Has Started");
});