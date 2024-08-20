const User = require("./user.model");

async function register(req, res) {
  const { name, email, type } = req.body;
  console.log(req.body);
  try {
    // check for existing user
    const existing = await User.findOne({ email: email });
    console.log(existing);
    if (existing)
      return res.status(404).json({
        status: "Bad request",
        messgae: "User already exist please check input!",
      });
    const rightsArray = type.split(",");

    const newUser = await User.create({
      name: name,
      email: email,
      accessRights: rightsArray,
    });
    if (!newUser)
      return res.status(500).json({ status: "Internal Server Error" });

    return res.status(201).json({ status: "Created" });
  } catch (error) {
    console.log(error);
  }
}
async function allUsers(req, res) {
  try {
    // check for existing user

    const users = await User.find().select("name email accessRights -_id ");

    if (!users)
      return res.status(500).json({ status: "Internal Server Error" });
    // console.log(users);
    return res.status(200).json({ data: users });
  } catch (error) {
    // console.log(error);
    return;
  }
}

module.exports = { register, allUsers };
