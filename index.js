const { response } = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv/config');

const productRouter=require('./routers/about')
const categoryRouter=require('./routers/category')
const UserLogin=require('./routers/userlogin')

const express=require('express');
const index=express();

index.use(cors());
index.options('*',cors())

const api=process.env.API_URL

//middleware
index.use(bodyParser.json());
index.use(morgan('tiny'));
index.use(`${api}/product`,productRouter)
index.use(`${api}/category`,categoryRouter)
index.use(`${api}/userlogin`,UserLogin)



mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'fuckubby'
  }).then(()=>{
      console.log('DB connection is ready')
  }).catch=((err)=>{
      console.log(err)
  });


index.listen(4000,(require,response)=>{
    
    console.log('server start')
})