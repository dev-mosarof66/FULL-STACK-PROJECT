import User from "../models/user.models.js";
const userController = async (req, res) => {
  const { username, password } = req.query;

  console.log(username, password);

  if (!username || !password) {
    res.status(401).send({
      message: "all fields are required.",
    });
  }
  const user = await User.findOne({
    username,
  });
  if (!user) {
    res.status(401).send({
      message: "user not exist",
    });
  }
  console.log(user);

  if (password != user.password) {
    res.status(401).send({
      message: "password not matched",
    });
  }

  const accessToken = await user.generateAccesstoken();
  if (!accessToken) {
    console.log(`token not generated`);
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.send({
    message: "login successful.",
    user,
    accessToken,
  });
};

const userProfileController = async (req, res) => {
  const id = req.user;
  console.log(`id in profile : ${id}`);

  if (!id) {
    res.status(401).send({
      message: "access token expired",
    });
  }
  const user = await User.findOne({ _id: id });

  console.log(user);

  if (!user) {
    res.status(401).send({
      message: "user not found",
    });
  }

  res.status(201).send({
    user,
    message: "User profile here.",
  });
};

export { userController, userProfileController };
