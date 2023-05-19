const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const session = require("express-session");

const passportConfig = require("./middleware/passportConfig");
const sequelize = require("./util/db");
const adminRoutes = require("./routes/admin");
const capthaRoutes = require("./routes/captha");
const imageRoutes = require("./routes/image");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.use(passportConfig.initialize());
app.use(passportConfig.session());

//routes
app.use(adminRoutes);
app.use(capthaRoutes);
app.use(imageRoutes);

app.post("/otp", function (req, res) {
  const smsClient = require("./middleware/smsClient"); //Modify the path based on your app
  const user = { name: "Abhishek", phone: "7002448242" };
  smsClient.sendPartnerWelcomeMessage(user);
  return res.json({message: "true"})
});

app.use(express.static("public"));
app.use(express.static('uploads'))

//server
const port = process.env.PORT || 3000;
sequelize
  .sync({
    // force: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("err happened =" + err);
  });
