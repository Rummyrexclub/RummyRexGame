const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ===== User Schema =====
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  coins: { type: Number, default: 1000 }
});

const User = mongoose.model("User", UserSchema);

// ===== Signup API =====
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const exist = await User.findOne({ username });
    if (exist) return res.json({ message: "User already exists" });

    const user = new User({ username, password });
    await user.save();

    res.json({ message: "Signup Success" });
  } catch (err) {
    res.json({ message: "Error" });
  }
});

// ===== Login API =====
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) return res.json({ message: "Invalid Credentials" });

    res.json({
      message: "Login Success",
      coins: user.coins
    });

  } catch (err) {
    res.json({ message: "Error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
