import path from "path";

import { Router } from "express";
import { BoardApiPath, UserApiPath } from "opm-models";
import multer from "multer";

import user from "./user";
import board from "./board";

const router = Router();
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

router.get(UserApiPath.authCheck, user.authCheck);

router.post(UserApiPath.signUp, user.signUpUser);
router.post(UserApiPath.signUpEditor, user.signUpEditor);
router.post(UserApiPath.logIn, user.logIn);
router.get(UserApiPath.logout, user.logout);
router.post(UserApiPath.checkedEmail, user.checkedEmail);
router.post(
  UserApiPath.setUpEditorProfile,
  upload.single("file"),
  user.setUpEditorProfile,
);
router.post(UserApiPath.setUpAssignments, user.setUpAssignments);
router.post(
  UserApiPath.setUpCertificates,
  upload.single("file"),
  user.setUpCertificates,
);

router.get(BoardApiPath.one, board.showArticle);
router.get(BoardApiPath.all, board.showArticleList);
router.post(BoardApiPath.listByUser, board.showArticleListByUser);
router.post(BoardApiPath.editingListByUser, board.showEditingListByUser);

router.post(BoardApiPath.write, board.writeArticle);
router.post(BoardApiPath.edit, board.editArticle);
router.post(BoardApiPath.delete, board.deleteArticle);
router.post(BoardApiPath.accept, board.acceptArticle);
router.post(BoardApiPath.cancel, board.cancelArticle);
router.post(BoardApiPath.proofread, board.proofreadArticle);
router.post(BoardApiPath.complete, board.completeArticle);
router.post(BoardApiPath.hitUp, board.hitUpArticle);
router.post(BoardApiPath.changeBoardState, board.changeBoardState);

export default router;
