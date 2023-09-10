const { fetchAll } = require("../../models/services/services.model");

async function httpFetchServices(req, res) {
  const services = await fetchAll();

  return res.status(200).json({
    services,
    message: "Retrieved services successfully!",
  });
}

module.exports = {
  httpFetchServices,
};
