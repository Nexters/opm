export type USER_STATUS = "ONLINE" | "OFFLINE";
export interface UserInfo {
  uId: string;
  uCreateDate: string;
  uEmail: string;
  uFirstName: string;
  uLastName: string;
  uNickName: string;
  uPassword: string;
  uStatus: USER_STATUS;
  uNotiList: UserNotificationList[];
}

export interface UserNotificationList {
  seq: number;
  checked: boolean;
  timestamp: string;
  notiBody: string;
}
