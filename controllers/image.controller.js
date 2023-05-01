const db = require("../models");
const tag = require("../models/tag");

const image = db.image;
const video = db.video;
const comment = db.comment;
const commentI = db.commentImage;
const tags = db.tags;
const tag_taggable = db.tag_taggable;

let self = {};


self.createImage = async (req,res)=>{
  try{
    let data = await image.create({
      title:req.body.title,
      url:req.body.url,
      comments:req.body.comments,
      tags:req.body.tags
    },{
      include:[tags,db.comment]
    })

    return res.status(200).json(data);

  }catch(err){
    return res.status(500).json(err);

  }
}

// self.createImages = async (req,res)=>{
//   try{
//     let data = await image.create({
//       title:req.body.title,
//       url:req.body.url,
//       comments:req.body.comments
//     }
//       ,{
//       include:[comment]
//     })
//     return res.status(200).json(data);

//   }catch(err){
//     return res.status(500).json(err);

//   }
// }

self.createVideo = async (req,res)=>{
  try{
    let data = await video.create( {
      title:req.body.title,
      url:req.body.url,
      comments:req.body.comments,
      tags:req.body.tags
    }
      ,{
      include:[tags,db.comment]
    })
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);

  }
}

self.getImages = async (req, res) => {
  try {
   
    let data = await image.findAll({

        include:[tags,comment]
      })
     
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

self.getVideos = async (req,res)=>{
  try{
    let data = await video.findAll({
      include:[tags,comment]
    })
    return res.json(data);

  }catch (err) {
    return res.status(500).json(err);
  }
}


self.manyTomany = async (req,res)=>{
  try{
    let data = await tags.findAll({
      include:[image,video]
    })
    return res.json(data);

  }catch (err) {
    return res.status(500).json(err);
  }
}

self.oneTomany = async (req,res) => {
  try{
    let data = await comment.findAll({
     include:[db.image,db.video]
     
    })
    return res.json(data);

  }catch (err) {
    return res.status(500).json(err);
  }
}


module.exports = self;
