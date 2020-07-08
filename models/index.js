class UserSchema {
  constructor(email, password, phone, date) {
    (this.email = email),
      (this.password = password),
      (this.phone = phone),
      (this.createdAt = date);
  }
}

// module.exports = UserLogin;
module.exports = UserSchema;
