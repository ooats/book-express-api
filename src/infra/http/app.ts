// import express from "express";
// import { v1Router } from "./api/v1";
// import cors from 'cors'

// const app = express();
// app.use(express.json({ limit: "1000mb" }));

// app.use(cors({  
//         allowedHeaders: [ 'Origin', 'X-Requested-With',    
//         'Content-Type', 'Accept', 'X-Access-Token', 'Authorization',    ], 
//         methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',   
//         preflightContinue: true,   
//         origin: '*',  }));
// app.use("/v1", v1Router);

// const port = 8080

// app.listen(()=>{console.log(`[server]: Server is running at http://localhost:${port}`);})