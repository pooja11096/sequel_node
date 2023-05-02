const db = require("../models");
const { Op } = require("sequelize");
// const user = require("../models/user");

const users = db.users;
const posts = db.posts;

let self = {}; 

self.insertData = async (req,res)=>{
  try{
    let data = await users.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      posts:req.body.posts
    },{
      include:[db.userPost]
    })
    return res.json(data);
  }catch(err){
    return res.send(err);
  }
}


self.showData  = async (req,res)=>{
  try{
    let data = await users.findAll({
      include:[db.userPost],
      where:{favorite:1}
    })
    return res.json(data);
  }catch(err){
    return res.send(err);
  }
}

self.getData = async (req, res) => {
  try {
    const { draw, search, order } = req.query;
    const offset = req.query.start || 0;
    const limit = req.query.length || 10;

    console.log("order",order);

    const columns = ["id","firstname", "lastname", "email"];
    // const column2 = ["name","content"]
    const {dir, column} = order[0];
    // console.log("dir",dir);
    // console.log("column",column);

    const columnOrder = columns[column];
    // console.log(columnOrder);
    const orderDirection = dir.toUpperCase();

    const query = {
      where: {},
      
      include:{
        association: db.userPost,
        where:{
          favorite:1
        }
      },
      offset: +offset,
      limit: +limit,
      order: [[columnOrder, orderDirection]],


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

    return res.status(500).send(err);
  }
};

module.exports = self;
