var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Andhra Pradesh", 
        image :"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ips comes from a line in section 1.10.32."
    },
    {
        name: "Rajasthan", 
        image :"https://cf.bstatic.com/images/hotel/max1024x768/234/234843649.jpg",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32."
    },
    {
        name: "Karnataka", 
        image :"https://pawnacamp.com/wp-content/uploads/2017/11/Pawna-Lake-Camping-camp-D-tents-in-a-line.jpg",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,es from a line in section 1.10.32."
    },
    {
        name: "India", 
        image :"https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsumfrom a line in section 1.10.32."
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
