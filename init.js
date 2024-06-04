const Chat=require("./models/chat.js");
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
const chat1=new Chat({
    from:"rajasi",
    to:"nidhish",
    msg:"Best Friend",
    created_at:new Date()
})
const chat2=new Chat({
    from:"nidhish",
    to:"rajasi",
    msg:"Kya baat hai",
    created_at:new Date()
})
const chat3=new Chat({
    from:"nihal",
    to:"shruti",
    msg:"How are you Shree ?",
    created_at:new Date()
})
const chat4=new Chat({
    from:"anagha",
    to:"preeti",
    msg:"Rajasi is a good employee",
    created_at:new Date()
})
const chat5=new Chat({
    from:"nihal",
    to:"shradha",
    msg:"Doing BDS",
    created_at:new Date()
})
const chat6=new Chat({
    from:"shruti",
    to:"riya",
    msg:"Sharing file",
    created_at:new Date()
})
const chat7=new Chat({
    from:"suhana",
    to:"shreya",
    msg:"Are you coming to college tomorrow ?",
    created_at:new Date()
})
chat1.save();
chat2.save();
chat3.save();
chat4.save();
chat5.save();
chat6.save();
chat7.save();