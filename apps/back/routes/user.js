const mongoose = require("mongoose");

// Schema 생성. (입력될 데이터의 타입이 정의된 DB 설계도)
var userModel = mongoose.Schema({
  u_id: "string",
  u_createDate: "string",
  u_email: "string",
  u_name: "string",
  u_nickName: "string",
  u_password: "string",
  u_status: "string",
});

userModel.set("collection", "User"); //컬렉션 이름을 이곳에서 지정

// 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
// mongoose.mode('post', PostSchema) 첫번째 인자로 collection name을 지정해주면 된다.
const User = mongoose.model("User", userModel);

const newUser = new User({
  u_id: "string",
  u_createDate: "string",
  u_email: "string",
  u_name: "test",
  u_nickName: "string",
  u_password: "string",
  u_status: "string",
});

newUser.save(function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(newUser, "Saved!");
  }
});

exports.showAll = (_, res) => {
  // User 전체 데이터 가져오기
  var allUser = User.find();
  console.log(allUser);
  return res.json(allUser);
}
