import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  profile_pic: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
