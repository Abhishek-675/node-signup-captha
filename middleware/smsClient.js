//This code was posted for an article at https://codingislove.com/send-sms-developers/

const axios = require("axios");

const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: "NGI0MzRiNjEzODRkNjQ0NzVhMzMzODMwNjkzOTVhNDQ=", //Text local api key
    sender: "AGLABS",
  },
});

const smsClient = {
  sendPartnerWelcomeMessage: (user) => {
    //   sendPartnerWelcomeMessage: (user) => {
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      //       `Hi ${user.name},
      // Welcome to iWheels, Download our app to get bookings from our customers with better pricing.
      // https://iwheels.co`
      params.append(
        "message",

        `Dear User,
        Your OTP for registration is {}. Use this OTP to validate your login to National Society.`
      );
      tlClient
        .post("/send", params)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  },
  sendVerificationMessage: (user) => {
    if (user && user.phone) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Your iWheels verification code is ${user.verifyCode}`
      );
      tlClient.post("/send", params).then((res) => console.log(res));
    }
  },
};

module.exports = smsClient;

// Now import the client in any other file or wherever required and run these functions
// const smsClient = require("./smsClient");
// smsClient.sendVerificationMessage(user)
