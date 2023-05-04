const db = require("../models");
const { Op } = require("sequelize");

const users = db.users;
const user_detail = db.user_details;

let self = {}; 

self.InsertUser = async (req,res)=>{
    try{
        let data = await users.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            user_details:req.body.user_details

        },{
            
            include:[db.userDetails]
        }).then((data)=>{
            return res.status(200).json(data);
        })

    }catch(err){
        return res.send(err)
    }   
}

self.showData = async (req,res)=>{
    try{
        const data = await users.findAndCountAll({
          
            include:[{
                model: db.user_details,

            }],
            
        })
        .then((data)=>{
            return res.status(200).json(data);
        })
    }catch(err){
        return res.send(err)
    }
}

self.renderPage = async (req,res,next)=>{
    try{
        res.render('index',{title:'Express'});

    }catch(err){
        return res.send(err)
    }
}   
  
self.getData = async (req,res)=>{
    try{
    

        const { draw, search, order } = req.query;
              const offset = req.query.start || 0;
              const limit = req.query.length || 10;
          
          
              console.log("offset",typeof offset);   
          
              const columns = ["id","firstname", "lastname", "email"];
              const {dir, column} = order[0];
              console.log("dir", dir);
              console.log("col", column);

              const columnOrder = columns[column];
              const orderDirection = dir.toUpperCase();


          
              if (column == 4) {
                orderBy = [[user_detail, "gender", orderDirection]];
              } else if (column == 5) {
                orderBy = [[user_detail, "contact", orderDirection]];
              }
              else if (column == 6) {
                orderBy = [[user_detail, "password", orderDirection]];
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
              
                        "$user_detail.gender$": {
                          [Op.like]: `%${search.value}%`,
                        },
                        "$user_detail.contact$": {
                          [Op.like]: `%${search.value}%`,
                        }
                        
                      },
                },
                include:{
                    model:db.user_details,

                },

                offset: +offset,
                limit: +limit,
                order:orderBy
          
              };
          
              if (search.value) {
                query.where[Op.or] = columns.map((column) => ({
                  [column]: { [Op.like]: `%${search.value}%` },
                }));
              }
          
              const data = await users.findAndCountAll(query,{
              });

              let target = data.rows;
          
              return res.json({
                draw: parseInt(draw),
                recordsTotal: data.count,
                recordsFiltered: data.count,
                data:data.rows
                
              });
    }catch(err){
        console.log("err");
        return res.send(err)
    }
}

module.exports = self;