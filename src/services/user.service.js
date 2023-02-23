const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
    };

    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async register(payload) {
    const data = this.extractUserData(payload);
    let cursor = await this.User.find({ username: data.username });
    const user = await cursor.next();
    if (user) return { error: "Username was exist", status: 400 };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.User.insertOne({ ...data, password: hashedPassword });
  }

  async login(payload) {
    const data = this.extractUserData(payload);
    let cursor = await this.User.find({ username: data.username });
    const user = await cursor.next();
    if (!user) return { error: "User not found", status: 400 };

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return { error: "Incorrect password", status: 400 };

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY);

    return { token };
  }
}

module.exports = UserService;
