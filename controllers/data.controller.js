const db = require("../models");
const { Op } = require("sequelize");
// const user = require("../models/user");

const users = db.users;
const posts = db.posts;

let self = {};

self.insertData = async (req, res) => {
  try {
    let data = await users.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        posts: req.body.posts,
      },
      {
        include: [db.userPost],
      }
    );
    return res.json(data);
  } catch (err) {
    return res.send(err);
  }
};

self.showData = async (req, res) => {
  try {
    let data = await users.findAll({
      include: [db.userPost],
      where: { favorite: 1 },
    });
    return res.json(data);
  } catch (err) {
    return res.send(err);
  }
};

self.getData = async (req, res) => {
  try {
    const { draw, search, order } = req.query;

    const offset = req.query.start || 0;
    const limit = req.query.length || 10;

    const columns = ["id", "firstname", "lastname", "email"];

    const { dir, column } = order[0];

    columnOrder = columns[column];
    orderDirection = dir.toUpperCase();

    if (column == 4) {
      orderBy = [[posts, "name", orderDirection]];
    } else if (column == 5) {
      orderBy = [[posts, "content", orderDirection]];
    } else {
      var orderBy = [[columnOrder, orderDirection]];
    }
   
    const query = {
      subQuery: false,

      where: {
        [Op.or]: {
          firstname: {
            [Op.like]: `%${search.value}%`,
          },
          lastname: {
            [Op.like]: `%${search.value}%`,
          },
          email: {
            [Op.like]: `%${search.value}%`,
          },

          "$posts.name$": {
            [Op.like]: `%${search.value}%`,
          },
          "$posts.content$": {
            [Op.like]: `%${search.value}%`,
          },
        },
      },

      include: {
        association: db.userPost,
        where: {
          favorite: 1,
        },
      },
      offset: +offset,
      limit: +limit,
      order: orderBy,
    };

    const data = await users.findAndCountAll(query);

    return res.json({
      draw: parseInt(draw),
      recordsTotal: data.count,
      recordsFiltered: data.count,
      data: data.rows,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = self;
