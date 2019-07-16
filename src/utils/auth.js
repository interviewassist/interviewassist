const { OAuth2Client } = require("google-auth-library");
const generator = require("generate-password");
const User = require("../models/user");

const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  console.log(CLIENT_ID);
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    })
    .catch(console.err);
  const payload = ticket.getPayload();
  const { email, name } = payload;

  console.log(email);
  console.log(name);
  // check if already signed up
  let dbUser = await User.findOne({
    email
  });

  if (!dbUser) {
    console.log("no dbUser");
    // sign up for new user
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
}

module.exports = {
  verify
};
