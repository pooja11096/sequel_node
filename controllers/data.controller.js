const db = require("../models");
const { Op } = require("sequelize");
// const user = require("../models/user");

const users = db.users;

let self = {}; 

self.getData = async (req, res) => {
  try {
    console.log("get data=-------------------------");
    const { draw, search, order } = req.query;
    const offset = req.query.start || 0;
    const limit = req.query.length || 10;


    console.log("offset",typeof offset);   

    const columns = ["id","firstname", "lastname", "email"];
    const {dir, column} = order[0];
    const columnOrder = columns[column];
    const orderDirection = dir.toUpperCase();

    const query = {
      where: {},
      offset: +offset,
      limit: +limit,
      order: [[columnOrder, orderDirection]]

    };

    if (search.value) {
      query.where[Op.or] = columns.map((column) => ({
        [column]: { [Op.like]: `%${search.value}%` },
      }));
    }

    const data = await users.findAndCountAll(query);


    return res.json({
      draw: parseInt(draw),
      recordsTotal: data.count,
      recordsFiltered: data.count,
      data: data.rows,
    });
  } catch (err) {

    console.log({err});
    return res.status(500).send(err);
  }
};

module.exports = self;
