const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'logo') {
            cb(null, 'public/images'); 
        } else if (file.fieldname === 'gambar') {
            cb(null, 'public/products');
        } else {
            cb(new Error('Field yang tidak dikenal'), false); 
        }
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Hanya file JPEG dan PNG yang diizinkan'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filter,
});

module.exports = upload;
