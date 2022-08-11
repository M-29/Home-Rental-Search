// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import route from "./routes/route.js"
// import path from "path";
// import bodyParser from "body-parser";

// const app =express();
// app.use(express.json());
// app.use(cors());
// dotenv.config({path:"config.env"});
// app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}))
// app.use('/',route);
// const __dirname = path.resolve();
// app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// const url =process.env.URI;
// const port =process.env.PORT;
// mongoose.connect(url,
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then( () => {app.listen(port,()=>{
//     console.log("Connected to database",port);
// })})
// .catch( (err)=>{
//     console.log(err);
// })


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/route.js"
import path from "path";
import bodyParser from "body-parser";

const app =express();
app.use(express.json());
app.use(cors());
dotenv.config({path:"config.env"});
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/',route);
const url =process.env.URI;
const port =process.env.PORT;
mongoose.connect(url,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => {app.listen(port,()=>{
    console.log("Connected to database",port);
})})
.catch( (err)=>{
    console.log(err);
})