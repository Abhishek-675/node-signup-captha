const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const User = require("../models/User");

function generateAccessToken(id) {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15d" });
}

function generateRefreshToken(id) {
  return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET);
}

let refreshTokens = [];

exports.token = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  if (refreshToken == null) return res.status(401);
  if (!refreshToken.includes(refreshToken)) return res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateAccessToken({ id: user.id });
    res.json({ accessToken: accessToken });
  });
};

exports.signup = async (req, res) => {
  const { name, email, phoneno, password } = req.body;
  // return console.log(req.body);
  if (req.body.name.length < 4) return res.json({message: "Name must be atleast 5 characters"})
  if(!req.body.email.includes("@",".com")) return res.json({message:"Enter a valid email"})
  if(req.body.phoneno.length < 10) return res.json({message:"Enter a valid phone no"})
  if(req.body.password < 4) return res.json({message:"Enter a valid password"})
  if (
    req.body.name == '' ||
    req.body.email == '' ||
    req.body.phoneno == '' ||
    req.body.password == ''
  )                                             //need to change in server
    return res
      .status(401)
      .json({ success: false, message: "Please enter complete Details" });
  const user = await User.findOne({ where: {email} });
  console.log(user);
  if (user) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists, Please Enter a different email" });
  } else {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      User.create({ name, email, phoneno, password: hashedPassword }).then(
        () => {
          res
            .status(201)
            .json({ success: true, message: "Sign up successful" });
        }
      );
    });
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email } });
//   if (!user)
//     return res
//       .status(404)
//       .json({ success: false, message: "user does not exist" });
//   bcrypt.compare(password, user.password, function (err, response) {
//     if (err) {
//       console.log(err);
//     }
//     if (!response)
//       res
//         .status(401)
//         .json({ success: false, message: "password do not match" });
//     if (response) {
//       const jwtToken = generateAccessToken(user.id);
//       res.status(200).json({
//         token: jwtToken,
//         email: user.email,
//         success: true,
//         message: "successfully logged in",
//       });
//     }
//   });
// };

exports.login2 = async (req, res) => {
  const id = { id: req.user.id };
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);
  refreshTokens.push(refreshToken);

  return res.status(200).json({
    success: true,
    accessToken: accessToken,
    refreshToken: refreshToken,
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    message: "Logged in",
  });
};

exports.deleteToken = (req, res) => {
  try {
    console.log("refresh tokens:", refreshTokens);
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.body.refreshToken
    );
    res.status(200).json({ message: "token deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.users = async (req, res) => {
  const user = await User.findAll({
    attributes: ["name"],
    where: { id: { [Op.ne]: req.user.id } },
  });
  res.status(200).json({ message: "Welcome to the dashboard", user });
};
