import express from "express";
import {mongodbURL, PORT} from "./config.js"
import mongoose from "mongoose";
import bookRoute from "./routers/bookRoute.js"
import cors from "cors"

const app = express();
//middleware for parsing the request body
app.use(express.json());
app.use(cors());
 

app.get('/',(req,res)=>{
    return res.status(234).send("Welcome to book store")
     
});

app.use('/books',bookRoute);



mongoose.connect(mongodbURL).then(()=>{
    console.log("mongodb connected ");
    app.listen(PORT,()=>{
        console.log(`Sucessfully running at port ${PORT}`);
        
    });  
}).catch((err)=>{
    console.log(err);
     
})
