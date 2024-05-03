import User from "../models/userSchema.js";

export const userController = async (req, res) => {
  const user = req.body;
  try {
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return res
        .status(200)
        .json({ error: "User already exist", success: false });
    } else {
      const newUser = new User(user);
      await newUser.save();
      return res
        .status(201)
        .json({ message: "Account created successfully", success: true });
    }
  } catch (error) {
    return req.status(500).json({ error: error.message, success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
