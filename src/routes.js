    const routes = require('express').Router();
    const multer = require('multer');
    const multerConfig = require('./config/multer');

    routes.get("/posts",multer(multerConfig).single('file'),(req,res)=>{
        return res.json({hello: 'word rocket'});
    });

    module.exports = routes;