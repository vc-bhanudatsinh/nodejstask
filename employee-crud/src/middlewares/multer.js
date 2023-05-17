import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(), "./public/profile-pics"));
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + "-" + uniqueSuffix + extension;
    req.body.fileName = fileName;
    cb(null, fileName);
  },
});

const fileFilter = async (req, file, cb) => {
  const extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".png")
    return cb(new Error("Only jpg or png files are allowed"));
  return cb(null, true);
};

export const uploadMulter = async (req, res, next) => {
  const upload = multer({ storage, fileFilter }).single("profilePic");
  return upload(req, res, async function (error) {
    if (error) return res.status(400).send({ message: error.message });
    next();
  });
};
