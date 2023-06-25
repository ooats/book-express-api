import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { booksRouter } from './modules/book/infra/http/routes';


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({  
  allowedHeaders: [ "Origin", "X-Requested-With",    
  "Content-Type", "Accept", "X-Access-Token", "Authorization",    ], 
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",   
  preflightContinue: true,   
  origin: "*",  }));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentationz",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: "http://localhost:3000/" }],
  },
  apis: [
    `${__dirname}/routes/example-route.ts`,
    "./dist/routes/example-route.js",
  ],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * 
 * 
 */
app.get('/', (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
  res.json({
    message: 'live',

  });
});


app.use("/book",booksRouter);
export default app;
