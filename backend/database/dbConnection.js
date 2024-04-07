import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "BLOG"
    }).then(()=>{
        console.log("connected to database successfulley")
    }).catch(err =>{
        console.log(`some error is occured while connecting to database ${err}`)
    })
}