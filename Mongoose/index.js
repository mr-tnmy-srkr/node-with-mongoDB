const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successfully established"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
//schema
const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});
//model
const User = mongoose.model("User", userSchema);

// User.findOne({ _id: "66361b030833bcb218f742ce" })
// User.findById("66361b030833bcb218f742ce")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//find
/* const user1 = new User({
  name: "Adam",
  email: "adam@example.com",
  age: 48,
}); */

//blueprint
// const user2 = new User({
//   name: "Eve",
//   email: "eve@example.com",
//   age: 42,
// });

// user1.save();
// user2
//   .save()
//    .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// User.insertMany([
//   {
//     name: "Adamm",
//     email: "adamm@example.com",
//     age: 5,
//   },
//   {
//     name: "evee",
//     email: "evee@example.com",
//     age: 6,
//   },
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//update one
// User.updateOne({ name: "Adamm" }, { age: 500 })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//Update Many
// User.updateMany({ age: { $lt: 44 } }, { age: 4 })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//findOneAndUpdate
// User.findOneAndUpdate({ name: "Adamm" }, { age: 34 }, { new: true })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//findByIdAndUpdate
// User.findByIdAndUpdate(
//   { _id: "66364b4979a0d97ce7cf9593" },
//   { age: 6 },
//   { new: true }
// )
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//deleteOne
// User.deleteOne({name:"evee"})
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//deleteMany
// User.deleteMany({ age: { $gt: 34 } })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//findByIdAndDelete
// User.findByIdAndDelete("66364be179a0d97ce7cf9594")
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

//findOneAndDelete
// User.findOneAndDelete({age: 404})
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
