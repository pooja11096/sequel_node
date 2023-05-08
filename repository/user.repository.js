const db = require("../models");
const user = db.users;


const getData = async (req,res) =>{
    const result = await user.findAll();
    return result;
}


const createData = async (data) =>{
    const result =  user.create(data);
    return result;
}

const getDataById = async (id) =>{
    const result = await user.findAll({where: {id: id}});
    return result;
}

const updateData = async (data,id) =>{
    const result = await user.update(data,{where: {id: id}});
    return result;

}

const deleteData = async (id) =>{
    const result = await user.destroy({where: {id: id}});
    return result;
}

module.exports = {getData, createData, getDataById, updateData, deleteData}