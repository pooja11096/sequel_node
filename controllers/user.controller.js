// const { Sequelize} = require('../models');
const db = require("../models");
const { Op } = require("sequelize");
const { post } = require("../routes/user.route");

const users = db.users;
const user_detail = db.user_detail;
const posts = db.posts;
const tags = db.tags;
const post_tags = db.post_tags;

const self = {};

self.onetoOne = async (req, res) => {
  try {
    console.log("data");
    let data = await users.findAll({
     include:[db.userDetails]
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
      include: [db.userPost]
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
      include: [db.postTag],
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
    let data = await users.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        user_detail: req.body.user_detail,
        posts: req.body.posts,
      },
      {
        include: [
          { association: db.userDetails },
          {
            association: db.userPost,
            include: [db.postTag],
          },
        ],
      }
    );
    return res.status(200).json({
      message: "data",
      data: data,
    });
  } catch (err) {
    console.log({ err });
  }
};

self.getById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await users.findOne({
      where: { id: id },
      include: [
        { association: db.userDetails },
        {
          association: db.userPost,
          include: [db.postTag],
        },
      ],
    });

    return res.status(200).json(data);
  } catch (err) {
    console.log({ err });
  }
};

self.getAllData = async (req, res) => {
  try {
    let data = await users.findAll({
      include: [
        { association: db.userDetails },
        {
          association: db.userPost,
          include: [db.postTag],
        },
      ],
    });

    console.log({ data });
    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};


self.deleteIt = async (req, res) => {
  try{

    let data = await users.findAll({
      where:{
        user_id:req.params.id
      },
      include:[
        {
          model:[db.userDetails],
          where: {user_id:id},
        },
        {
          model:[db.userPost]
          ,where:{user_id:id}  
        }
      ]
    }).then(function(deleted){
      return users.destroy({where:{id:{$in:deleted.map(function(d){return d.id})}}})
    })

    return res.status(200).json({
      success: "true",
      message:"data deleted"
    });
      
  }catch(err) {
    res.send(err);

  }
}

module.exports = self;
