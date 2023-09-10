const Services = require("./services.mongo");
const DoctorsModel = require("../doctors/doctors.model");

async function fetchAll() {
  const service = await Services.find().populate({
    path: "doctors",
    select: "name",
  });

  if (service) {
    return service;
  }

  return null;
}

async function createManyServices(data) {
  // get doctors by name
  const servicesWithDoctor = await Promise.all(
    data.map(async (service) => {
      const docs = await Promise.all(
        service.doctors.map(async (doctorName) => {
          const doc = await DoctorsModel.findByName(doctorName);
          return doc;
        })
      );

      console.log(docs);
      service.doctors = docs;
      return service;
    })
  );
  console.log(servicesWithDoctor);

  const services = await Services.create(servicesWithDoctor);

  return services;
}

async function deleteAllServices() {
  const services = await Services.deleteMany();

  return services;
}

async function findByTitle(title) {
  const service = await Services.findOne({ title });

  if (service) {
    return service;
  }

  return null;
}

module.exports = {
  fetchAll,
  createManyServices,
  deleteAllServices,
  findByTitle,
};
