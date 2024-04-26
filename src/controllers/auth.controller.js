import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const secret = process.env.JWT_SECRET_KEY;

async function signup(req, res) {
  const { email, fullname, username, password } = req.body;
  if (!email || !fullname || !username || !password) {
    return res.status(400).json({ errors: ["Missing Required fields."] });
  }

  try {
    const isUserExists = await User.findOne({ username });
    if (isUserExists) {
      res.status(400).json({ error: "Username already taken" });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUSer = new User({
      email,
      username,
      fullname,
      password,
    });

    await newUSer.save();
    // console.log("signup", password, hashedPassword);

    const token = jwt.sign(
      { id: newUSer._id, username: newUSer.username },
      secret
    );

    const user = { ...newUSer._doc };
    delete user.password;

    res.status(201).json({
      newUSer,
      encodedToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error in signinup" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ errors: ["Missing Required fields."] });
  }

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({ error: "No user with given username" });
    }

    const isPasswordSame = await bcrypt.compare(password, foundUser.password);
    console.log(isPasswordSame, password, foundUser.password);
    if (isPasswordSame) {
      const token = jwt.sign(
        { id: foundUser._id, username: foundUser.username },
        secret
      );

      //   const user = { ...foundUser };
      //   delete user.password;

      return res.status(200).json({
        user: {
          username: foundUser.username,
          emai: foundUser.email,
          fullname: foundUser.fullname,
        },
        encodedToken: token,
      });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server, Error in login" });
  }
}

export { signup, login };
