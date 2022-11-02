import { randomUUID, randomBytes, pbkdf2 } from "crypto";

import { Request, Response } from "express";
import { StatusCode } from "opm-models";

import User from "../models/user.model";

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다";
const CREATED_ID: string = "회원가입 완료";

const signUpUser = async (req: Request, res: Response) => {
  const { uFirstName, uLastName, uEmail, uPassword, uEditorType } = req.body;

  randomBytes(64, (_, buf) => {
    pbkdf2(
      uPassword,
      buf.toString("base64"),
      94751,
      64,
      "sha512",
      async (_, key) => {
        const newUser = new User({
          uId: randomUUID(),
          uEmail: uEmail,
          uPassword: key.toString("base64"),
          uPasswordSalt: buf.toString("base64"),
          uFirstName: uFirstName,
          uLastName: uLastName,
          uEditorType: uEditorType,
        });
        console.info("회원등록 정보:", newUser);

        const checkUser = await User.find({ uEmail: uEmail });
        if (checkUser.length) {
          console.info("이미 존재하는 사용자입니다.");
          return res.status(StatusCode.CONFLICT).send(ALREADY_ID);
        } else {
          console.info("존재하지 않는 사용자입니다.");
          console.info("회원등록 정보:", newUser);
          await newUser.save();
          return res.send(CREATED_ID);
        }
      },
    );
  });
};

const signUpEditor = async (req: Request, res: Response) => {
  const {
    uFirstName,
    uLastName,
    uEmail,
    uPassword,
    uEditorType,
    uEmailCheck,
    uProfileInfo,
    uCertificate,
    uFiles,
  } = req.body;

  randomBytes(64, (_, buf) => {
    pbkdf2(
      uPassword,
      buf.toString("base64"),
      94751,
      64,
      "sha512",
      async (_, key) => {
        const newUser = new User({
          uId: randomUUID(),
          uEmail: uEmail,
          uPassword: key.toString("base64"),
          uPasswordSalt: buf.toString("base64"),
          uFirstName: uFirstName,
          uLastName: uLastName,
          uEditorType: uEditorType,
          uEmailCheck: uEmailCheck,
          uProfileInfo: uProfileInfo,
          uCertificate: uCertificate,
          uFiles: uFiles,
        });
        console.info("회원등록 정보:", newUser);

        const checkUser = await User.find({ uEmail: uEmail });
        if (checkUser.length) {
          console.info("이미 존재하는 사용자입니다.");
          return res.status(StatusCode.CONFLICT).send(ALREADY_ID);
        } else {
          console.info("존재하지 않는 사용자입니다.");
          console.info("회원등록 정보:", newUser);
          await newUser.save();
          return res.send(CREATED_ID);
        }
      },
    );
  });
};

const logIn = async (req: Request, res: Response) => {
  const { uEmail, uPassword } = req.body;
  const user = await User.findOne({ uEmail: uEmail });

  if (!user) {
    return res.status(StatusCode.BAD_REQUEST).send("잘못된 인풋입니다.");
  }

  pbkdf2(uPassword, user.uPasswordSalt, 94751, 64, "sha512", (_, key) => {
    if (user.uPassword === key.toString("base64")) {
      return res.status(StatusCode.OK).json(user);
    }
  });
};

const getEditorInfo = async (req: Request, res: Response) => {
  const user = await User.findOne({ uId: req.body.eId });
  try {
    if (!user) {
      return res.status(StatusCode.BAD_REQUEST).send("wrong email");
    }
    return res.status(StatusCode.OK).send({ data: user });
  } catch (error) {
    console.error(error);
  }
};

const checkedEmail = async (req: Request, res: Response) => {
  const foundUser = await User.findOne({ uEmail: req.body.uEmail });
  foundUser.uEmailCheck = true;

  try {
    const data = await foundUser.save();
    return res.status(StatusCode.OK).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const setUpEditorProfile = async (req: Request, res: Response) => {
  try {
    const email = JSON.parse(req.body.uEmail);
    const profile = JSON.parse(req.body.profile);
    const foundUser = await User.findOne({ uEmail: email });
    foundUser.uProfileInfo = profile;
    foundUser.uFiles = {
      certificatePaper: JSON.stringify(req.file),
    };

    const data = await foundUser.save();
    return res.status(StatusCode.OK).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const setUpAssignments = async (req: Request, res: Response) => {
  const foundUser = await User.findOne({ uEmail: req.body.uEmail });
  foundUser.uCertificate = {
    biography: "",
    resume: "",
    correctAssignments: req.body.correctData,
    paraphraseAssignments: req.body.paraphraseData,
  };

  try {
    const data = await foundUser.save();
    return res.status(StatusCode.OK).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const setUpCertificates = async (req: Request, res: Response) => {
  try {
    const email = JSON.parse(req.body.uEmail);
    const biography = req.body.biography;
    const correct = JSON.parse(req.body.correct);
    const paraphrase = JSON.parse(req.body.paraphrase);

    const foundUser = await User.findOne({ uEmail: email });
    foundUser.uEditorType = "WAITING";
    foundUser.uCertificate = {
      biography: biography,
      resume: JSON.stringify(req.file),
      correctAssignments: correct,
      paraphraseAssignments: paraphrase,
    };

    const data = await foundUser.save();
    return res.status(StatusCode.OK).send({ data });
  } catch (error) {
    console.info(error);
  }
};

const user = {
  signUpUser,
  signUpEditor,
  logIn,
  getEditorInfo,
  checkedEmail,
  setUpEditorProfile,
  setUpAssignments,
  setUpCertificates,
};

export default user;
