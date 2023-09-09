const Services = require("./services.mongo");
const Doctors = require("../doctors/doctors.model");

async function createManyServices(data) {
  // get doctors by name
  const servicesWithDoctor = await Promise.all(
    data.map(async (service) => {
      const docs = await Promise.all(
        service.doctors.map(async (doctorName) => {
          const doc = await Doctors.findByName(doctorName);
          return doc;
        })
      );

      service.doctors = docs;
      return service;
    })
  );

  const services = await Services.create(servicesWithDoctor);

  return services;
}

async function deleteAllServices() {
  const services = await Services.deleteMany();

  return services;
}

module.exports = {
  createManyServices,
  deleteAllServices,
};
