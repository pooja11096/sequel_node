const { student_table, Sequelize } = require("../models");
const { Op } = require("sequelize");

const self = {};

self.getAllData = async (req, res) => {
  try {
    let data = await student_table.findAll({
      // order: [["name", "ASC"]],
        
    });

    console.log({ data });
    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};

self.searching = async (req, res) => {
  try {
    let {name, class_id} = req.query;
    // let query = req.params.query;
    const data = await student_table.findAll({
      where: {
        [Op.or]: [
          {
          name: { [Op.like]: `%${name}%` },
          },
          {
            class_id: { [Op.like]: `%${class_id}%` },

          }
         
        ],
      },

 
    });

    res.send(data);
  } catch (error) {
    console.log({ error });
  }
};

self.sorting = async(req,res)=>{
  try{
    let order = req.query.order;

    let data = await student_table.findAll({
      order: [["name", order]],
    });
    return res.status(200).json(data);
  }catch (error) {
    console.log({ error });
  }
}

self.pagination = async (req, res) => {
  // console.log("All");

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

    const data = await student_table.findAndCountAll({
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

self.getById = async(req,res)=>{
  try{
      let id = req.params.id;
      let data = await student_table.findByPk(id);
      if(data){
          return res.status(200).json({
              success:true,
              data:data
          })
      }else{
          return res.status(400).json({
              success:false,
              error:"no such data found",
              data:[]
              
          })
      }

  }catch(error){
      res.status(500).json({
          success:false,
          error:"error"
      })
  }
}

self.createStudent = async (req, res) => {
  
    let newSt = {
      name: req.body.name,
      class_id: req.body.class_id,
    };
    let data = await student_table.create(newSt);
    return res.status(200).json({
      message: "data",
      data: data,
    });
   
};

self.updateData = async (req, res) => {
  try{

    let id= req.params.id;

    let body= req.body;
    let data = await student_table.update(body,{
        where:{
            id:id
        }
    });
    if(data[0]=== 0){
        return res.status(400).json({
            success:false,
            error:"no such data found",
            data:[]
            
        })
    }else{
        return res.status(200).json({
            success:true,
            message:'data updated'
        })
    }

  } catch (error) {
    console.log({ error });
  }
}

self.deleteData = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await student_table.destroy({
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
