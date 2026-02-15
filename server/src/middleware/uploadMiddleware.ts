import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /pdf|jpg|jpeg|png|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images and Docs Only!'));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 25000000 }, // 25MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

export default upload;
