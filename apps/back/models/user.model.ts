import mongoose from "mongoose";
import { UserInfo } from "opm-models";

const userSchema = new mongoose.Schema<UserInfo>({
  uId: "",
  uCreateDate: "",
  uEmail: "",
  uFirstName: "",
  uLastName: "",
  uNickName: "",
  uPassword: "",
  uStatus: "String",
  uNotiList: [
    {
      seq: "Number",
      checked: "Boolean",
      timestamp: "",
      notiBody: "",
    },
  ],
  uEditorType: "Boolean",
  uEmailCheck: "Boolean",
  uProfileInfo: {},
  uCertificate: {},
  uFiles: {},
});
userSchema.set("collection", "User");
const User = mongoose.model<UserInfo>("User", userSchema);

export default User;
