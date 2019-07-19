const fs = require("fs");
const https = require("https");
const app = require("./app");
const port = process.env.PORT || 3000;

// enable https
// https
//   .createServer(
//     {
//       key: fs.readFileSync("./config/server.key"),
//       cert: fs.readFileSync("./config/server.cert")
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`Server is up on port ${port}`);
//   });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
