import { Router } from "express";
import { BoardApiPath, UserApiPath } from "opm-models";

import uploadSingleFile from "../helpers/multer";

import user from "./user";
import board from "./board";

const router = Router();

router.post(UserApiPath.signUp, user.signUpUser);
router.post(UserApiPath.signUpEditor, user.signUpEditor);
router.post(UserApiPath.logIn, user.logIn);
router.post(UserApiPath.getEditorInfo, user.getEditorInfo);
router.post(UserApiPath.checkedEmail, user.checkedEmail);
router.post(
  UserApiPath.setUpEditorProfile,
  uploadSingleFile,
  user.setUpEditorProfile,
);
router.post(UserApiPath.setUpAssignments, user.setUpAssignments);
router.post(
  UserApiPath.setUpCertificates,
  uploadSingleFile,
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
