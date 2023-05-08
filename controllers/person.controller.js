const db = require("../models");
// const addData = require('../repository/user.repository')
const person = db.person;
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
    const data = await person.findAll();

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

// var addUser = async (req, res) =>{
//     const data = await addData(req.body)
//     return res.send(data)
// }

self.createData = async (req, res) => {
  try {
    
    const data = await person.create(req.body);

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

//get user by id

self.getById = async (req, res) => {
  try {
    let id = req.params.id;

    const data = await person.findAll({
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

    const data = await person.update(req.body, {
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

    const data = await person.destroy({
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
