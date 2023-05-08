// const db = require("../models");
const userQuery = require('../repository/user.repository')
// const users = db.users;
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
    // const data = await users.findAll();
    const data = await userQuery.getData()

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
    
    // const data = await users.create(req.body);
    const data = await userQuery.createData(req.body)

    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

//get user by id

self.getById = async (req, res) => {
  try {
    let id = req.params.id;

    // const data = await users.findAll({
    //   where: {
    //     id: id,
    //   },
    // });

    const data = await userQuery.getDataById(id);
    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
};

self.updateData = async (req, res) => {
  try {
    let id = req.params.id;

    // const data = await users.update(req.body, {
    //   where: {
    //     id: id,
    //   },
    // });
    const data = await userQuery.updateData(req.body, id);
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

    // const data = await users.destroy({
    //   where: {
    //     id: id,
    //   },
    // });
    const data = await userQuery.deleteData(id);
    return res.json({
      message: "data deleted successfully",
    });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = self;
