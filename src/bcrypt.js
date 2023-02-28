const bcrypt = require("bcryptjs");

const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    await genSalt
      .then(async (salt) => {
        const hashedPassword = await bcryptHash(password, salt);
        resolve(hashedPassword);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const genSalt = new Promise((resolve, reject) => {
  bcrypt.genSalt((err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

const bcryptHash = (password, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = { hashPassword, comparePassword };
