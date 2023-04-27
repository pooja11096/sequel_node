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
  
    let data = await users.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        user_detail:req.body.user_detail,
        posts: req.body.posts    
      },
      {
        include: [{association:db.userDetails},
          {

            association: db.userPost,
            include: [db.postTag]
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

self.getById = async (req,res)=>{
  try{
    let id = req.params.id;
    let data = await users.findAll({
      include: [{association:db.userDetails},
        {

          association: db.userPost,
          include: [db.postTag]
        },
      ]
    },{where:{id:id}});
  }catch (err) {
    console.log({ err });
  }
}

self.getAllData = async (req, res) => {
  try {
    let data = await users.findAll({
      include: [{association:db.userDetails},
        {

          association: db.userPost,
          include: [db.postTag]
        },
      ],
     
    });

    console.log({ data });
    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};



self.updateIt = async (req,res)=>{
  try{
    let id=req.params.id;
    let newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      posts: req.body.posts   
    };

    let postD = [];
    let tagD = [];

    if (req.body.posts) {
      let postL = req.body.posts.length;
      
      for (var i = 0; i < postL; i++) {
        if (req.body.posts.length) {
          let tagL = req.body.posts[i].tags.length;

          let postData = {
            name: req.body.posts[i].name,
            title: req.body.posts[i].title,
            content: req.body.posts[i].content,
          };     
          postD.push(postData);
        }
      }
    }

    console.log("postdata",postD);

    // let pData={
    //   name:
    // }
    let pData = {
      name:req.body.posts[0].name,
      title:req.body.posts[0].title,
      content:req.body.posts[0].content,
      user_id:req.params.id
    }

    let data = await users.update(req.body,{where:{
      id:id
    } 
  }).then(async function(){
    await users.findByPk(id,{include:[{
      association: db.userPost,
      include: [db.postTag]
    }]}).then(async function(user){
      await posts.findOrCreate({where:{

        // {
        
        // user_id:id
        // postD
        name:req.body.posts[0].name,
        title:req.body.posts[0].title,
        content:req.body.posts[0].content,
        user_id:req.params.id
      }
     
      })
        .then(post =>{
          user.setPosts(post.user_id)
        })
      })
      
    })
  return res.status(200).json({
    message: "data updated",
    data:data
  });
  }catch (error) {
    console.log({ error });
  }
}


self.updateAll = async (req,res)=>{
  try{  
    let id=req.params.id;
    let newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      user_detail:req.body.user_detail

    }

    await users.update(newData,{
      where:{
        id:id
      }
    })
    .then(async function(){
      await users.findOne({where:{id:id}})
      .then(async function(user){
        await user.user_detail.update(req.body.user_detail,{where:{user_id:id}})
    })
  })

  
    return res.status(200).json({
        message: "data updated",
        data:data,
      });
    }catch(err){
      res.send(err);
    }
}
   

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
        id: id
      }
    },{include: [{association:db.userDetails},
      {

        association: db.userPost,
        include: [db.postTag]
      },
    ],});
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
