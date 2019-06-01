require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
/*
database setup
 */

let conexaoMongo = mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
if(conexaoMongo){
    console.log("Conexão com banco de dados estabelecida com sucesso!");
}

app.use(require('./routes'));
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(morgan( 'dev'));
app.use('/files',express.static(path.resolve(__dirname,"..","tmp","uploads")));
app.listen(3500);