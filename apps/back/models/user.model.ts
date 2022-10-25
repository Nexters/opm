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
  uPasswordSalt: "",
  uStatus: "String",
  uNotiList: [
    {
      seq: "Number",
      checked: "Boolean",
      timestamp: "",
      notiBody: "",
    },
  ],
  uEditorType: "String",
  uEmailCheck: "Boolean",
  uProfileInfo: {},
  uCertificate: {},
  uFiles: {},
});
userSchema.set("collection", "User");
const User = mongoose.model<UserInfo>("User", userSchema);

export default User;
