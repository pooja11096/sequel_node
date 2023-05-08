const db = require("../models");

const selection_master = db.selection_master;
const option_master = db.option_master;

const self = {};


self.addData = async (req, res) => {
    try {
      const data = await selection_master.create(
        {
          selection_name: req.body.selection_name,
          option_master: req.body.option_master,
        },
        {
          include: [db.selectionOption],
        }
      );
  
      return res.send(data);
    } catch (err) {
      return res.send(err);
    }
  };

self.showData = async (req,res) =>{
    try{

        const data = await selection_master.findAll({
            include: [db.selectionOption]
        })

        return res.send(data);
        // res.render('index',{menu:data});


    }catch(err){
        return res.send(err);
    }
}



self.updateIt = async (req, res) => {
    try {
      let id = req.params.id;
      let data = await selection_master
        .findOne({
          where: {
            id: id,
          },
        })      
        .then((user) => {
          option_master
            .findOrCreate({
              where: {
            //    option_name: req.body.option_master[0].option_name,
               selection_id: id
              },
            })
            .then((post) => {
              user.setOption_master(post.id);
            });
        });
      return res.status(200).json({
        success: "true",
        message: "data updated",
        data: data,
      });
    } catch (error) {
        console.log({ error });
      }
    };


self.updateData = async (req,res) =>{
    let option_name = req.query.option_name;

    const data = await option_master.update(req.body,{
        where:{

            option_name: option_name
        }
    })
    return res.json({
        message: 'data updated successfully'
    });
}

self.deleteData = async (req,res) =>{
    let option_name = req.query.option_name;

    const data = await option_master.destroy({
        where:{

            option_name: option_name
        }
    })
    return res.json({
        message: 'data deleted successfully'
    });
}



self.getControls = async (req, res) => {
    try {
      const type = req.query.type || "combo";
      const selection_id = req.query.selection_id || 1;
      const multiple = req.query.multiple;
      
      const data = await selection_master.findOne({
        where: {
          id: selection_id,
        },
        include: [db.selectionOption],
      });
  
      if (type == "radio") {
        var html = `<label for ="${data.selection_name}"> ${data.selection_name} </label><br>`;
  
        for (var i = 0; i < data.option_master.length; i++) {
          html += `<input type="radio" name=${data.selection_name} id=${data.option_master[i].option_name} value=${data.option_master[i].option_name}> ${data.option_master[i].option_name}<br>`;
        }
      } else if (type == "checkbox") {
        var html = `<label for ="${data.selection_name}"> ${data.selection_name} </label><br>`;
  
        for (var i = 0; i < data.option_master.length; i++) {
          html += `<input type="checkbox" name=${data.option_master[i].option_name} id=${data.option_master[i].option_name} value=${data.option_master[i].option_name}> ${data.option_master[i].option_name}`;
        }
      } else if (type == "combo") {
        var html = `<label for ="${data.selection_name}"> ${data.selection_name} </label><br><select name="${data.selection_name}" id="${data.selection_name}" ${multiple}><br>`;
  
        for (var i = 0; i < data.option_master.length; i++) {
          html += `<option value=${data.option_master[i].option_name}>${data.option_master[i].option_name}</option>`;
        }
        html += `</select>`;
      }
  
      return res.send(html);
    } catch (err) {
      return res.send(err);
    }
  };


module.exports = self;