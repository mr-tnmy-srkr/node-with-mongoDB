const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
var methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connections established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
/* let chat1 = new Chat({
  created_at: new Date(),
  message: "Hello",
  to: "PS",
  from: "TS",
});

chat1
  .save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

//Index Route
app.get("/chats", async (req, res, next) => {
  try {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

//New Route
app.get("/chats/new", async (req, res) => {
  // throw new ExpressError(403, "Page Not Found");
  res.render("new.ejs");
});

//Create Route
app.post("/chats", async (req, res, next) => {
  try {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
      from: from,
      to: to,
      message: msg,
      created_at: new Date(),
    });
    await newChat.save();
    // .then((res) => console.log("Chat was saved"))
    // .catch((err) => console.log(err));
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//Edit Route
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found"));
    }
    res.render("edit.ejs", { chat });
  } catch (err) {
    next(err);
  }
});

//Update Route
app.put("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { message: newMsg },
      { runValidator: true, new: true }
    );
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//Destroy Route
app.delete("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//Testing Express Error
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access Admin to forbidden");
  // throw new ExpressError ()
});

app.get("/", (req, res) => {
  res.send("root is working");
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
