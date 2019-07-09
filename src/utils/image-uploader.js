const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2"
});

const s3 = new AWS.S3();

export default multer({
  storage: multerS3({
    s3: s3,
    bucket: "image.profile.user.interviewassist",
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
