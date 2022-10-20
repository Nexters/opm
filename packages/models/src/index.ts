import { Url, SocketPath, UserApiPath, BoardApiPath } from "./constant/path";
import type { ARTICLE_STATUS, BoardInfo, BoardEditData } from "./models/board";
import type { BoardNotiKey } from "./models/noti";
import type { UrlKey, SocketKey } from "./models/path";
import type {
  CommonSocket,
  UserSocket,
  MessageType,
  MessageSocket,
  BoardSocket,
  BoardEditSocket,
  UpdateBoardStatusSocket,
} from "./models/socket";
import type {
  USER_STATUS,
  UserInfo,
  UserNotificationList,
  UserLogInData,
  UserSignUpData,
  EditorProfile,
  EditorCareers,
  EditorCertificate,
  Assignments,
} from "./models/user";
import { StatusCode } from "./models/status";
import { BoardNotiText } from "./models/noti";
import { CorrectAssignments, ParaphraseAssignments } from "./models/assignment";

export {
  SocketPath,
  Url,
  UserApiPath,
  BoardApiPath,
  CommonSocket,
  UserSocket,
  MessageType,
  USER_STATUS,
  UserInfo,
  UserNotificationList,
  UserLogInData,
  UserSignUpData,
  EditorProfile,
  EditorCareers,
  EditorCertificate,
  Assignments,
  MessageSocket,
  BoardSocket,
  BoardEditSocket,
  UpdateBoardStatusSocket,
  ARTICLE_STATUS,
  UrlKey,
  SocketKey,
  BoardInfo,
  BoardEditData,
  StatusCode,
  BoardNotiKey,
  BoardNotiText,
  CorrectAssignments,
  ParaphraseAssignments,
};
