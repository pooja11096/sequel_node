// const { Sequelize} = require('../models');
const db = require("../models");
const { Op } = require("sequelize");
const { post } = require("../routes/user.route");

const users = db.users;
const user_detail = db.user_detail;
const posts = db.posts;
const tags = db.tags;
const post_tags = db.post_tags;
// const post_tag = db.post_tag;

const self = {};

self.onetoOne = async (req, res) => {
  try {
    console.log("data");
    let data = await users.findAll({
      include: [
        {
          model: user_detail,
        },
      ],
    });
    console.log("data1");
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
};

self.onetoMany = async (req, res) => {
  try {
    let data = await users.findAll({
      include: [
        {
          model: posts,
        },
      ],
    });
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
};

self.manyToMany = async (req, res) => {
  try {
    let data = await posts.findAll({
      include: [
        {
          model: tags,
        },
      ],
    });
    // })
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      err: err,
    });
  }
};

self.createUser = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email) {
    res.status(500).send({ message: "Bad request" });
  }
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      post: req.body.posts,
    };
    let data = await users.create(newUser);

    var allPosts = [];

    if (data && data.id) {
      await user_detail.create({
        password: req.body.password,
        user_id: data.id,
      });
      let postlength = req.body.posts.length;

      console.log("length", postlength);

      if (req.body.posts) {
        for (var i = 0; i < postlength; i++) {
          console.log("data:", req.body.posts[i].name);
          let postData = {
            name: req.body.posts[i].name,
            title: req.body.posts[i].title,
            content: req.body.posts[i].content,
            user_id: data.id,
          };
          allPosts.push(postData);
          console.log("hkj", allPosts);
        }

        await posts.bulkCreate(allPosts);
      }

      
      let lastPost = await posts.findAll({
        limit:1,
        order:[
          ['id','DESC']
        ]
      });
      console.log("lastPost",lastPost);
      // console.log("id",req.lastPost.dataValues.id);


    let tagArr = [];
     console.log(req.body.posts[0].id);

      for (var i = 0; i < postlength; i++) {
        
        let tagL = req.body.posts[i].tags.length;
        if(tagL){
          console.log("tag_l", tagL);

          for (var j = 0; j < tagL; j++) {
            let tagData = {
              name: req.body.posts[i].tags[j].name,
            };
            tagArr.push(tagData);
            console.log("tags", tagArr);
          }
        

        }
        
      }
      await tags.bulkCreate(tagArr);

    }
    return res.status(200).json({
      message: "data",
      data: data,
    });
  } catch (err) {
    console.log({ err });
  }
};



self.getAllPosts = async (req, res) => {
  try {
    let data = await posts.findAll({
      include: [
        {
          model: tags,
        },
      ],
    });
    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};

self.getAllData = async (req, res) => {
  try {
    let data = await users.findAll({
      //   order: [["firstname", "ASC"]],
    });

    console.log({ data });
    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};

self.updateUser = async (req, res) => {
  try {
    // let id = req.params.id;
    let newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    console.log(newData);
    let data = users.update(newData, { where: { id: req.params.id } });
    console.log(data);
    return res.status(200).json({
      message: "data updated",
    });
  } catch (error) {
    console.log({ error });
  }
};

self.searching = async (req, res) => {
  try {
    let { firstname, lastname, email } = req.query;

    // let query = req.params.query;
    const data = await users.findAll({
      where: {
        [Op.or]: [
          {
            firstname: { [Op.like]: `%${firstname}%` },
          },
          {
            lastname: { [Op.like]: `%${lastname}%` },
          },
          {
            email: { [Op.like]: `%${email}%` },
          },
        ],
      },
    });

    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};

self.paginationSorting = async (req, res) => {
  try {
    const pageNum = Number.parseInt(req.query.page);
    const sizeNum = Number.parseInt(req.query.size);

    // const search_key = req.query.search;

    let page = 1;
    if (!Number.isNaN(pageNum) && pageNum > 0) {
      page = pageNum;
    }

    let size = 1;
    if (!Number.isNaN(sizeNum) && sizeNum > 0 && sizeNum < 10) {
      size = sizeNum;
    }

    console.log("page", page);
    console.log("size", size);

    const data = await users.findAndCountAll({
      //   order: [["firstname", "ASC"]],

      limit: size,
      offset: page * size,
    });
    return res.status(200).json({
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log({ error });
  }
};

self.deleteData = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await users.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.send("data deleted");
    } else {
      return res.status(400).json({
        success: false,
        message: "data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: "false",
      error: err,
    });
  }
};

module.exports = self;
