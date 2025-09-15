import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.DB_URL,{
        dbName:"CRM"
    }).then(()=>{
        console.log("dbConnection successful");
    }).catch((err)=>{
        console.log("error in connecting to db : ",err);
    })
}