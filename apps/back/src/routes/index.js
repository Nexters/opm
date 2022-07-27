const { Router } = require("express");
const router = Router();
const board = require("./board");
const user = require("./user");

console.log("test");

// 유저
router.get("/user/all", user.show_all); // 모든 회원정보 보기

// Article - 게시글 == 채팅방
router.get("/api/allarticles", board.getAllArticles);

module.exports = router;
