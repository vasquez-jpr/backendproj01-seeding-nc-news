const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}...`));

// const server = require("./app");

// server.listen(5050, () => {
//   console.log("Listening on port: 5050");
// });
