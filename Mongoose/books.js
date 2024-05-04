const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successfully established"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
//schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price is too low for selling"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["book", "text-book"],
  },
  genres: [String],
});
//model
const Book = mongoose.model("Book", userSchema);

// let book1 = new Book({
//   name: "Physics",
//   author: "RD Barman",
//   price: "1500",
//   category: "text-book",
//   genres: ["fiction", "story-book", "my-book"],
// });
// book1
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

Book.findByIdAndUpdate(
  "6636556f2b9b86aaa1839c43",
  { price: -500 },
  { runValidators: true },
)
  .then((res) => console.log(res))
  .catch((err) => console.log(err.errors.price.properties.message));
