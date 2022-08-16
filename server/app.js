const express = require("express");
const mongoose = require("mongoose");
const chats = require("./data/data");
const app = express();

mongoose.connect("mongodb://localhost:27017/chats");
const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatModel);

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);
const message = mongoose.model("Message", messageModel);

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userModel);

app.post("/register", async (req, res) => {
  const { email, name, password, avatar } = req.body;
  const useExist = await User.findOne({ email });
  if (useExist) {
    throw new Error("User already exist");
  }
  const user = await User.create({
    email,
    password,
    avatar,
    name,
  });
  res.status(201).send(user);
});
app.lost("/login");

app.listen(5000, () => {
  console.log("server is running 5000");
});
