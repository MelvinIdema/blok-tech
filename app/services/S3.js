import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

AWS.config.update({ region: 'eu-central-1' });
const s3 = new AWS.S3();

function filter(req, file, cb) {
  if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'));
  }
}

const upload = multer({
  filter,
  storage: multerS3({
    s3,
    bucket: 'matching-app-static',
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export default upload;
