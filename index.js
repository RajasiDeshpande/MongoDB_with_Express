const express=require("express");
let app=express();
let port=8080;
let path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
app.listen(port,()=>{
    console.log(`app is listening through ${port}`);
})
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
const mongoose=require("mongoose");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let {from , to , msg}=req.body;
    let newChat=new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at:new Date()
    });
    newChat.save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log("some error occured");
    })
    res.redirect("/chats");
})
//Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//Update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect("/chats");
})
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedchat=await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
})