import path from "path";

import { RequestHandler } from "express";
import multer from "multer";
import { StatusCode } from "opm-models";

const customStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().valueOf() + file.originalname);
  },
});
const upload = multer({
  storage: customStorage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".pdf" &&
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".doc" &&
      ext !== ".docx"
    ) {
      return callback(
        new Error("Only .pdf, .doc, .docs, .png, .jpg format allowed!"),
      );
    }
    callback(null, true);
  },
  limits: { fileSize: 1048576 },
});
const uploadSingleMulter = upload.single("file");

const uploadSingleFile: RequestHandler = (req, res, next) => {
  uploadSingleMulter(req, res, (err) => {
    if (err) {
      return res.status(StatusCode.NOT_ACCEPTABLE).send();
    }
    next();
  });
};

export default uploadSingleFile;
