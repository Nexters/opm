import { Router } from "express";
import { BoardApiPath, UserApiPath } from "opm-models";

import user from "./user";
import board from "./board";
import room from "./room";

const router = Router();

router.post(UserApiPath.signup, user.signUpUser);
router.post(UserApiPath.signIn, user.signIn);

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

router.get("/room/all", room.showAllRoom);

export default router;
