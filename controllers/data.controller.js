const db = require("../models");
const { Op } = require("sequelize");
const user_detail = require("../models/user_detail");
// const user = require("../models/user");

const users = db.users;
const user_details = db.user_details;

let self = {}; 

self.InsertUser = async (req,res)=>{
    try{
        let data = await users.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            user_details:req.body.user_details
            // user_details:req.body.user_details

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
            // include:[db.user_details]
            // include:[db.userDetails]
            // as:'user_details'
            include:[{
                model: db.user_details,

            }],
            // attributes:{exclude:['firstname']}
            
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

// self.getData = async (req, res) => {
//     try {
//       console.log("get data=-------------------------");
//       const { draw, search, order } = req.query;
//       const offset = req.query.start || 0;
//       const limit = req.query.length || 10;
  
  
//       console.log("offset",typeof offset);   
  
//       const columns = ["id","firstname", "lastname", "email"];
//       const {dir, column} = order[0];
//       const columnOrder = columns[column];
//       const orderDirection = dir.toUpperCase();
  
//       const query = {
//         where: {},
//         offset: +offset,
//         limit: +limit,
//         order: [[columnOrder, orderDirection]]
  
//       };
  
//       if (search.value) {
//         query.where[Op.or] = columns.map((column) => ({
//           [column]: { [Op.like]: `%${search.value}%` },
//         }));
//       }
  
//       const data = await users.findAndCountAll(query);
  
  
//       return res.json({
//         draw: parseInt(draw),
//         recordsTotal: data.count,
//         recordsFiltered: data.count,
//         data: data.rows,
//       });
//     } catch (err) {
  
//       console.log({err});
//       return res.status(500).send(err);
//     }
//   };

  
self.getData = async (req,res)=>{
    try{
        // console.log("getdata");
        // let {draw,order,search}= req.query;
        // let offset = req.query.offset||0;
        // let limit = req.query.limit||10;

        // let columns = ["id","firstname","lastname","email"];
        // const {dir,column} = order[0];
        // const columnOrder = columns[column];
        // const orderDirection = dir.upperCase();
        
        // console.log("heyy");
        // const query = {
        //     where:{},
        //     // include:[user_details],
        //     offset: +offset,
        //     limit: +limit,
        //     order:[columnOrder,orderDirection]
        // }

        // if(search.value){
        //     query.where[Op.or] = columns.map((column)=>({
        //         [column]:{[Op.like]: `%${search.value}%`}
        //     }))
        // }

        // let data = await users.findAndCountAll(query);

        // console.log("data",data);

        //  res.json({
        //     draw: parseInt(draw),
        //     recordsTotal: data.count,
        //     recordsFiltered: data.count,
        //     data: data.rows
        // })


        const { draw, search, order } = req.query;
              const offset = req.query.start || 0;
              const limit = req.query.length || 10;
          
          
              console.log("offset",typeof offset);   
          
              const columns = ["id","firstname", "lastname", "email"];
            //   const colums2 = ["gender","contact","password"];
              const {dir, column} = order[0];
              const columnOrder = columns[column];
              const orderDirection = dir.toUpperCase();
          
              const query = {
                where: {},
                include:{
                    model:user_details,
                    // attributes: {exclu}
                    attributes:{exclude:['id']}

                    // as:'user_details'
                },

                offset: +offset,
                limit: +limit,
                order: [[columnOrder, orderDirection]]
          
              };
          
              if (search.value) {
                query.where[Op.or] = columns.map((column) => ({
                  [column]: { [Op.like]: `%${search.value}%` },
                }));
              }
          
              const data = await users.findAndCountAll(query,{
              });

              let target = data.rows;
            //   let source = 
            //   let data2 =[];
            //   for(var i=0;i<data.rows.length;i++) {
            //     data2.push(data.rows[i].user_detail);
            //   }
            //   console.log("data2",data2);
            //   console.log(typeof data.rows);
            //   var obj = data.rows.concat(data2)
            //   console.log("obj",obj);
          
              return res.json({
                draw: parseInt(draw),
                recordsTotal: data.count,
                recordsFiltered: data.count,
                data:data.rows
                // data1:data2
                
              });
    }catch(err){
        console.log("err");
        return res.send(err)
    }
}

module.exports = self;