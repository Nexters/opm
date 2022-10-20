import {
  UrlKey,
  SocketKey,
  UserApiKey,
  BoardApiKey,
  BoardApiEndPoint,
  UserApiEndPoint,
} from "../models/path";

export const Url: Record<UrlKey, string> = {
  LOCAL_SOCKET: "ws://localhost:8080",
  REAL_SOCKET: "wss://proofor.cf:8080",
  LOCAL_SERVER: "http://localhost:8080",
  REAL_SERVER: "https://proofor.cf:8080",
};
export const UserApiPath: Record<UserApiKey, string> = {
  all: UserApiEndPoint.all,
  signUp: UserApiEndPoint.signUp,
  signUpEditor: UserApiEndPoint.signUpEditor,
  logIn: UserApiEndPoint.logIn,
  checkedEmail: UserApiEndPoint.checkedEmail,
  setUpEditorProfile: UserApiEndPoint.setUpEditorProfile,
  setUpAssignments: UserApiEndPoint.setUpAssignments,
  setUpCertificates: UserApiEndPoint.setUpCertificates,
};
export const BoardApiPath: Record<BoardApiKey, BoardApiEndPoint> = {
  one: BoardApiEndPoint.one,
  all: BoardApiEndPoint.all,
  write: BoardApiEndPoint.write,
  edit: BoardApiEndPoint.edit,
  delete: BoardApiEndPoint.delete,
  accept: BoardApiEndPoint.accept,
  cancel: BoardApiEndPoint.cancel,
  proofread: BoardApiEndPoint.proofread,
  complete: BoardApiEndPoint.complete,
  listByUser: BoardApiEndPoint.listByUser,
  editingListByUser: BoardApiEndPoint.editingListByUser,
  hitUp: BoardApiEndPoint.hitUp,
  changeBoardState: BoardApiEndPoint.changeBoardState,
};
export const SocketPath: Record<SocketKey, string> = {
  END: "end",
  CONNECT: "connect",
  MESSAGE: "message",
  ROOM_DATA: "roomData",
  DISCONNECT: "disconnect",
  ERROR: "error",
};
