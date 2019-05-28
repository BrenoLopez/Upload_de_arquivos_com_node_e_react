    const mongoose = require('mongoose');
    const aws = require('aws-sdk');
    const fs = require('fs');
    const path= require('path');
    // função que converte uma forma antiga de callbacks para lidar com programção assincronas para a norva forma com async e await
    const {promisify} = require('util');
    const s3 = new aws.S3();
    const PostSchema =  new mongoose.Schema({
        name: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
            type: Date,
            default : Date.now
        }

    });
    //função normal pq arrow function nao consegue usar valor do this
    // antes de salvar o documento no banco, caso nao tenha url, salva url local
    //obs key é o nome da imagem
    PostSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
    });

    PostSchema.pre('remove', function(){
        if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: this.key
        }).promise()
        }
        else{
            //promissify serve para versões antigas de callback
            return promisify(fs.unlink).then(path.resolve(__dirname,'..','..','tmp','uploads',this.key));
        }
    });

    module.exports =  mongoose.model("Post", PostSchema);