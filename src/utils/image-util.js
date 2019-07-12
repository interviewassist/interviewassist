const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2"
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "image.profile.user.interviewassist",
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  }),
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

const getImage = (bucket, imageId) => {
  const params = { Bucket: bucket, Key: `${imageId}.png` };
  return s3.getObject(params, function (err, data) {
    return data
  }).promise().then(data => data.Body).catch(e => e)
}

module.exports = {
  upload,
  getImage
};
