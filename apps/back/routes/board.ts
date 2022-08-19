import { randomUUID } from "crypto";

import { Request, Response } from "express";
import { BoardEditData, BoardInfo, StatusCode } from "opm-models";

import Board from "../models/board.model";
import User from "../models/user.model";

const seqCheck = (seq: number) => {
  if (seq) {
    return seq + 1;
  }
  return 1;
};

const showArticle = async (req: Request, res: Response) => {
  const { aId } = req.query;
  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }
  return res.status(200).send({ data: foundArticle });
};

const showArticleList = async (req: Request, res: Response) => {
  const { aId } = req.query;
  if (aId) {
    const foundArticle = await Board.findOne({ aId: aId });
    if (!foundArticle) {
      return res.status(200).send({ code: StatusCode.BAD_REQUEST });
    }

    const lastMongoId = foundArticle._id;
    const BoardData = await Board.find({ _id: { $lt: lastMongoId } })
      .sort({ _id: -1 })
      .limit(20);
    return res.status(200).send({ data: BoardData });
  }

  const BoardData = await Board.find().sort({ _id: -1 }).limit(20);
  return res.status(200).send({ data: BoardData });
};

const showArticleListByUser = async (req: Request, res: Response) => {
  const { uId } = req.body;
  const foundArticleList = await Board.find({ uId: uId }).sort({ _id: -1 });
  if (foundArticleList.length === 0) {
    return res.status(200).send({ code: StatusCode.NO_CONTENT });
  }
  return res.status(200).send({ data: foundArticleList });
};

const showEditingListByUser = async (req: Request, res: Response) => {
  const { uId } = req.body;
  const foundArticleList = await Board.find({ eId: uId }).sort({ _id: -1 });
  if (foundArticleList.length === 0) {
    return res.status(200).send({ code: StatusCode.NO_CONTENT });
  }
  return res.status(200).send({ data: foundArticleList });
};

const writeArticle = async (req: Request, res: Response) => {
  const { uId, aTitle, aDescription, aContent, aCategory } = req.body;
  const createDate = new Date().toISOString();

  const newArticle = new Board<BoardInfo>({
    aId: randomUUID(),
    uId,
    eId: "",
    aTitle,
    aDescription,
    aContent,
    aCategory,
    aCreateDate: createDate,
    aEditDate: createDate,
    aHit: 0,
    aEditList: [] as BoardEditData[],
    aStatus: "INIT",
  });

  try {
    const data = await newArticle.save();
    return res.status(200).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const editArticle = async (req: Request, res: Response) => {
  const { aId, uId, aTitle, aDescription, aContent, aCategory } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.uId !== uId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "INIT") {
    return res.status(200).send({ code: StatusCode.NOT_INIT });
  }

  foundArticle.aTitle = aTitle;
  foundArticle.aDescription = aDescription;
  foundArticle.aContent = aContent;
  foundArticle.aCategory = aCategory;
  foundArticle.aEditDate = new Date().toISOString();

  try {
    const data = await foundArticle.save();
    return res.status(200).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  const { aId, uId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.uId !== uId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "INIT") {
    return res.status(200).send({ code: StatusCode.NOT_INIT });
  }

  try {
    const data = await Board.deleteOne({ aId: aId, uId: uId });
    if (data.deletedCount === 1) {
      return res.status(200).send({ data: { aId, uId } });
    }
    throw Error;
  } catch (error) {
    console.info(error);
  }
};

const acceptArticle = async (req: Request, res: Response) => {
  const { aId, eId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  const foundUser = await User.findOne({ uId: foundArticle.uId });

  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.eId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (!foundUser) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.uId === eId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "INIT") {
    return res.status(200).send({ code: StatusCode.NOT_INIT });
  }

  foundArticle.eId = eId;
  foundArticle.aStatus = "EDITING";

  try {
    const boardData = await foundArticle.save();
    const userData = await foundUser.save();
    return res.status(200).send({ boardData, userData });
  } catch (error) {
    console.info(error);
  }
};

const cancelArticle = async (req: Request, res: Response) => {
  const { aId, eId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  const foundUser = await User.findOne({ uId: foundArticle.uId });

  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (!foundUser) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.eId !== eId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "EDITING") {
    return res.status(200).send({ code: StatusCode.NOT_EDITING });
  }

  foundArticle.eId = "";
  foundArticle.aStatus = "INIT";

  try {
    const boardData = await foundArticle.save();
    const userData = await foundUser.save();
    return res.status(200).send({ boardData, userData });
  } catch (error) {
    console.info(error);
  }
};

const proofreadArticle = async (req: Request, res: Response) => {
  const { aId, eId, aProofread } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  const foundUser = await User.findOne({ uId: foundArticle.uId });

  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (!foundUser) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.eId !== eId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "EDITING") {
    return res.status(200).send({ code: StatusCode.NOT_EDITING });
  }

  const editList = foundArticle.aEditList;
  const isSeq = editList.length !== 0 && editList[editList.length - 1].seq;
  const newBoardEditData: BoardEditData = {
    seq: seqCheck(isSeq),
    aProofread,
    aProofreadDate: new Date().toISOString(),
  };
  foundArticle.aEditList.push(newBoardEditData);
  foundArticle.aStatus = "DONE";

  try {
    const boardData = await foundArticle.save();
    const userData = await foundUser.save();
    return res.status(200).send({ boardData, userData });
  } catch (error) {
    console.info(error);
  }
};

const completeArticle = async (req: Request, res: Response) => {
  const { aId, uId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  const foundUser = await User.findOne({ eId: foundArticle.eId });

  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (!foundUser) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.uId !== uId) {
    return res.status(200).send({ code: StatusCode.METHOD_NOT_ALLOWED });
  }

  if (foundArticle.aStatus !== "DONE") {
    return res.status(200).send({ code: StatusCode.NOT_DONE });
  }

  foundArticle.aStatus = "COMPLETE";

  try {
    const boardData = await foundArticle.save();
    const userData = await foundUser.save();
    return res.status(200).send({ boardData, userData });
  } catch (error) {
    console.info(error);
  }
};

const hitUpArticle = async (req: Request, res: Response) => {
  const { aId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  foundArticle.aHit += 1;

  try {
    const data = await foundArticle.save();
    return res.status(200).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const board = {
  showArticle,
  showArticleList,
  showArticleListByUser,
  showEditingListByUser,
  writeArticle,
  editArticle,
  deleteArticle,
  acceptArticle,
  cancelArticle,
  proofreadArticle,
  completeArticle,
  hitUpArticle,
};

export default board;
