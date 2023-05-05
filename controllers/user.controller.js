const db = require("../models");
const users = db.users;
const self = {};

self.getMsg = async (req, res) => {
  try {
    return res.send("hello user");
  } catch (err) {
    return res.send(err);
  }
};

self.getData = async (req, res) => {
  try {
    const data = await users.findAll();

    return res.send(data);
    // res.status(200).send({ id: 1, name: "Tom, Cruise" });
  } catch (err) {
    return res.send(err);
  }
};

self.createData = async (req, res) => {
  try {
    
    const data = await users.create(req.body);

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

//get user by id

self.getById = async (req, res) => {
  try {
    let id = req.params.id;

    const data = await users.findAll({
      where: {
        id: id,
      },
    });
    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

self.updateData = async (req, res) => {
  try {
    let id = req.params.id;

    const data = await users.update(req.body, {
      where: {
        id: id,
      },
    });
    return res.json({
      message: "data updated successfully",
    });
  } catch (err) {
    return res.send(err);
  }
};

self.deleteData = async (req, res) => {
  try {
    let id = req.params.id;

    const data = await users.destroy({
      where: {
        id: id,
      },
    });
    return res.json({
      message: "data deleted successfully",
    });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = self;
