const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){

  res.sendFile(__dirname+"/signup.html")
})

// 7b46984f2aadcc2b81913fd2ae96f105-us10
// unique id = 4170256174

app.post("/failure",function(req,res){
  res.redirect("/");
});




app.post("/",function(req,res){
  var firstName = req.body.FName
  var lastName = req.body.LName
  var email = req.body.email
  
var data ={
   members:[
     {
       email_address : email,
       status : "subscribed",
       merge_fields :{
       FNAME : firstName,
       LNAME : lastName
     }

     }
   ]
};

const jsonData = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/4170256174"

const options=
{
  method:"POST",
  auth:"Raman:7b46984f2aadcc2b81913fd2ae96f105-us10"
}

const request = https.request(url,options,function(response){

  if(response.statusCode == 200)
  {
    res.sendFile(__dirname+"/success.html")
  }
  else{
    res.sendFile(__dirname+"/failure.html")
  }



    })

    request.write(jsonData);
    request.end();





});


app.listen(process.env.PORT || 3000,function(){
  console.log("app is listening")

})
