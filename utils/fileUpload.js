const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "content")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 10000 * 10},
    fileFilter: (req, file, cb) => {
        const filetypes = '/jpg|png|mp4|gif|flv|mov|wmv|/'
        console.log('file', file.mimetype, file.originalname)
        // const mimeType = filetypes.test(file.mimetype);
        // const extname = filetypes.test(path.extname(file.originalname));

        // if(mimeType && extname){
        //     return cb(null, true);
        // }
        return cb(null, true);
        // cb("Only images supported")
    }
}).single("content")

module.exports = upload