const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const mongoose=require('mongoose');
const date=require(__dirname+"/date.js");

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("css"));


mongoose.connect('mongodb://127.0.0.1:27017/todolistdb');

const itemSchema =mongoose.Schema({
    'newitem':String
})
const itemsmodel=mongoose.model('item',itemSchema);    //collection name : items



let founditems=[];
var day="";
const currentday=date.getdate();


app.get("/",function(req,res){

        finding({}).then((result) =>{
             res.render("lists",{listtitle:currentday,newlistitem:founditems})
        })
})

app.post("/",function(req,res){

       const taskname ={newitem:req.body.newitem} ;
       inserting(taskname).then((result)=>{});
       finding().then((result)=>{
        res.render("lists",{listtitle:currentday,newlistitem:founditems});
       });
    
})


app.post("/delete",function(req,res){
    const id={_id:req.body.checkbox};
    deleting(id).then((result)=>{
      res.redirect("/");
    })

})





app.listen(3000,function(){
    console.log("server running on 3000")
})



async function finding(){
    try{
         founditems=await itemsmodel.find({});
         
         
    }
    catch(err){
          console.log(err);
          
    }
}

async function inserting(k){
    try{
        await itemsmodel.insertMany(k)
        console.log("inserted item : ");
        console.log(k);
    }
    catch(err){
          console.log(err);
    }
}


async function deleting(id){
    try{
        await itemsmodel.deleteOne(id);
        console.log("delete item :");
        console.log(id);
    }catch(err){
        console.log(err);
    }
}