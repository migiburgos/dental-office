const http = require("http");

require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, HOST, () => {
    console.log(`Listening on port http://${HOST}:${PORT}...`);
  });
}

startServer();
