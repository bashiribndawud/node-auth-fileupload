const validateName = (name) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/);
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailReg = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
  return emailReg.test(email);
};

const validatePassword = (password) => {
  const passReg = new RegExp(/[0-9]/);
  return passReg.test(password);
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
