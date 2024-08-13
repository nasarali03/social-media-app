import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No user found" });
  }

  res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { username, email, fullName, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ $or: [{ username }, { email }] });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "user already existed" });
  }
  const user = new User({ username, email, fullName, password });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};
