require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
/*
database setup
 */

let conexaoMongo = mongoose.connect('mongodb://localhost:27017/upload',{useNewUrlParser:true});
if(conexaoMongo){
    console.log("Conexão com banco de dados estabelecida com sucesso!");
}

app.use(require('./routes'));
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(morgan( 'dev'));
app.listen(3000);