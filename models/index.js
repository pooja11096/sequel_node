'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.image = require('./image')(sequelize,Sequelize);
db.video = require('./video')(sequelize,Sequelize);
db.comment = require('./comment')(sequelize,Sequelize);
db.tags = require('./tag')(sequelize,Sequelize);
db.tag_taggable = require('./tag_taggable')(sequelize,Sequelize);


db.image.hasMany(db.comment,{foreignKey:'commentableId',scope:{
  commentableType:'image'
}});
db.video.hasMany(db.comment,{foreignKey:'commentableId',scope:{
  commentableType:'video'
}});

db.comment.belongsTo(db.image,{foreignKey:'commentableId'});
db.comment.belongsTo(db.video,{foreignKey:'commentableId'});


db.image.belongsToMany(db.tags,{through:{model:db.tag_taggable, unique:false, scope:{taggableType:'image'}},foreignKey:'taggableId',constraints:false})

db.tags.belongsToMany(db.image,{through:{model:db.tag_taggable, unique:false},foreignKey:'tagId',constraints:false})

db.video.belongsToMany(db.tags,{through:{model:db.tag_taggable, unique:false, scope:{taggableType:'video'}},foreignKey:'taggableId',constraints:false})

db.tags.belongsToMany(db.video,{through:{model:db.tag_taggable, unique:false},foreignKey:'tagId',constraints:false})

db.sequelize.sync().then(()=>{
  console.log("sync");
})

module.exports = db;
