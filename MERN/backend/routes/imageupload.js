const express = require('express')
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk')
const path = require('path');
const {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION} = require('../config/application');
// const {} = require('../config/database');

aws.config.update({
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    region: AWS_S3_BUCKET_REGION
});

const s3 = new aws.S3();

var storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, "bevy:" + Date.now() + path.extname(file.originalname));
    }
})
  
var upload = multer({ storage: storage }).single('image');

router.post('/',(req, res) => {
    upload(req, res, function(err){
        if(err){
            res.status(500).json({message: `User Image upload failed due to internal issue. ${err}`});
            return;
        }
        res.status(200).json({message:'User image uploaded succesfully to S3.', imageUrl: req.file.location}); 
    });
});

module.exports = router;