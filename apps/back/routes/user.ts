import { randomUUID, randomBytes, createDecipheriv, pbkdf2 } from "crypto";

import { Request, Response } from "express";
import { StatusCode, UserInfo } from "opm-models";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

const ALREADY_ID: string = "존재하는 ID 입니다";
const CREATED_ID: string = "회원가입 완료";
const TOKEN_ID = "_tid";
const ONE_DAY = 86400000;
const TOKEN_VALUE_INDEX = 1;

const SECRET_KEY = process.env.SECRET_KEY || "testKey";

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

const login = async (req: Request, res: Response) => {
  const inputEmail = req.body.uEmail;
  const inputPassword = req.body.uPassword;

  const algorithm = "aes-256-cbc";
  const key = Buffer.from(process.env.CIPHER_KEY);
  const iv = Buffer.from(process.env.CIPHER_IV);
  const decipher = createDecipheriv(algorithm, key, iv);
  let originPassword = decipher.update(inputPassword, "base64", "utf8");
  originPassword += decipher.final("utf8");

  const user = await User.findOne({ uEmail: inputEmail });
  if (!user) {
    return res.status(StatusCode.BAD_REQUEST).send("wrong email");
  }

  const {
    uId,
    uEmail,
    uPassword,
    uPasswordSalt,
    uEditorType,
    uFirstName,
    uLastName,
    uNickName,
    uNotiList,
    uProfileInfo,
    uStatus,
    uCertificate,
    uCreateDate,
  } = user;

  const payload: Omit<
    UserInfo,
    "uPassword" | "uPasswordSalt" | "uEmailCheck" | "uFiles"
  > = {
    uId,
    uEmail,
    uEditorType,
    uFirstName,
    uLastName,
    uNickName,
    uNotiList,
    uProfileInfo,
    uStatus,
    uCertificate,
    uCreateDate,
  };

  try {
    await new Promise((resolve, reject) => {
      pbkdf2(originPassword, uPasswordSalt, 94751, 64, "sha512", (_, key) => {
        if (uPassword === key.toString("base64")) {
          return resolve(true);
        }
        return reject("INVALID USER");
      });
    });
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie(TOKEN_ID, token, {
      expires: new Date(Date.now() + ONE_DAY),
      httpOnly: true,
    });
    return res.status(200).json(payload);
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "INVALID USER" });
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie(TOKEN_ID);
  return res.status(200).send("");
};

const authCheck = async (req: Request, res: Response) => {
  // const return401 = () => res.status(401).json({ message: "INVALID TOKEN" });
  try {
    const { cookie } = req.headers;
    const tokenKeyValue = cookie
      .split(";")
      .map((cookieString) => cookieString.trim().split("="))
      .find((tokenKeyValue) => tokenKeyValue.includes(TOKEN_ID));
    const token = tokenKeyValue?.[TOKEN_VALUE_INDEX];

    if (!token) {
      throw Error;
    }
    const data = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ data });
  } catch (e) {
    console.info("INVALID TOKEN");
    // return return401();
  }
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
  login,
  getEditorInfo,
  logout,
  authCheck,
  checkedEmail,
  setUpEditorProfile,
  setUpAssignments,
  setUpCertificates,
};

export default user;
