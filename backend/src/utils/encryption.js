const bcrypt = require("bcrypt");

module.exports = {
  encryptPassword: async (text, strength = 10) => {
    const salt = await bcrypt.genSalt(strength);
    return await bcrypt.hash(text, salt);
  },

  comparePasswords: async (text, hashed) => await bcrypt.compare(text, hashed),
};
