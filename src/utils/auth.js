const admin = require("./firebase-admin");
const generator = require("generate-password");
const User = require("../models/user");

const verifyIdToken = idToken => {
  return admin.auth().verifyIdToken(idToken);
};

const handleSocialLoginedUser = async data => {
  const { email, name } = data;

  // check if already signed up
  let dbUser = await User.findOne({
    email
  });

  if (!dbUser) {
    // sign up for a new user
    dbUser = new User({
      email,
      name,
      password: generator.generate({
        // generate random password for social logined users
        length: 10,
        numbers: true
      })
    });

    try {
      await dbUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  const loginToken = await dbUser.generateAuthToken();

  return {
    email,
    name,
    loginToken
  };
};

module.exports = { verifyIdToken, handleSocialLoginedUser };
