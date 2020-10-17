var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Andhra Pradesh", 
        image :"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg",
        description: "blahhhhhhhhhhhh"
    },
    {
        name: "Rajasthan", 
        image :"https://cf.bstatic.com/images/hotel/max1024x768/234/234843649.jpg",
        description: "blahhhhhhhhhhhh"
    },
    {
        name: "Karnataka", 
        image :"https://pawnacamp.com/wp-content/uploads/2017/11/Pawna-Lake-Camping-camp-D-tents-in-a-line.jpg",
        description: "blahhhhhhhhhhhh"
    },
    {
        name: "India", 
        image :"https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg",
        description: "blahhhhhhhhhhhh"
    }
]
function seedDB(){
    Campground.remove({}, function(err){
        if(err)
            console.log(err);
        console.log("Removed Campground");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Added a capmground");

                    Comment.create(
                        {
                            text:"This place is good",
                            author: "Devansh"
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new Comment");
                            }
                        });
                }
            });
        });
    });
   
    
}
module.exports = seedDB;
