import { CorrectQuestion, ParaphraseQuestion } from "./assignment";

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
  uEditorType: boolean;
  uEmailCheck: boolean;
  uProfileInfo: EditorProfile;
  uCertificate: EditorCertificate;
  uFiles: EditorFiles;
}

export interface UserNotificationList {
  seq: number;
  checked: boolean;
  timestamp: string;
  notiBody: string;
}

export interface EditorProfile {
  language: string;
  timezone: string;
  educations: EditorEducation[];
  careers: EditorCareers[];
}

export interface EditorEducation {
  degree: string;
  nameOfSchool: string;
  major: string;
  attendedStartDate: string;
  attendedEndDate: string;
}

export interface EditorCareers {
  company: string;
  position: string;
  attendedStartDate: string;
  attendedEndDate: string;
}

export interface EditorCertificate {
  biography: string;
  resume: string;
  correctAssignments: Assignments[];
  paraphraseAssignments: Assignments[];
}

export interface Assignments {
  number: number;
  question: CorrectQuestion | ParaphraseQuestion;
  answer?: string;
}

export interface EditorFiles {
  certificatePaper: string;
  resume?: string;
}

export interface UserLogInData {
  uEmail: string;
  uPassword: string;
}

export interface UserSignUpData {
  uFirstName: string;
  uLastName: string;
  uEmail: string;
  uPassword: string;
  uEditorType: boolean;
  uEmailCheck?: boolean;
  uProfileInfo?: EditorProfile;
  uCertificate?: EditorCertificate;
  uFiles?: EditorFiles;
}
