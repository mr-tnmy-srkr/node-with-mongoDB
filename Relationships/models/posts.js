const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

//first post
/* const addData = async () => {
  let user1 = new User({
    username: "rahulkumar",
    email: "rahulkumar@gmail.com",
  });
  let post1 = new Post({
    content: "Hello World!",
    likes: 7,
  });

  post1.user = user1;

  let userInfo = await user1.save();
  let postInfo = await post1.save();

  console.log(userInfo);
  console.log(postInfo);
}; */
// addData();

//second post

const addData = async () => {
  let user = await User.findOne({ username: "rahulkumar" });

  let post2 = new Post({
    content: "Bye Bye!",
    likes: 5,
  });

  post2.user = user;

  let postInfo = await post2.save();
  console.log(postInfo);
};
// addData();

//view data
const getData = async () => {
  let result = await Post.find({}).populate("user", "username");
  console.log(result);
};
getData();
